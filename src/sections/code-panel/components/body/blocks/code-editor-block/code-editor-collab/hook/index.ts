import { type RefObject, useEffect, useState, useRef, useCallback } from 'react'

import type { Extension } from '@codemirror/state'
import type { Text } from '@codemirror/state'
import { EditorView } from '@codemirror/view'
import { EditorSelection } from '@uiw/react-codemirror'
import type { Socket } from 'socket.io-client'

import { AuthUserType } from '@/auth/types'

import { RoomStatus } from '../components/status-label'

import { EditorMode } from './constants'
import { type File } from './requests'
import { type UseCommentsPropsReturn, useComments } from './useComments'
import { useInitCodemirror, UseBaseInitReturn } from './useInitCodemirror'
import { type MemoizedProps, useMemoizedProps } from './useMemoizedProps'
import { unsubscribeSocket } from './utils/socket'

export interface UseCodeEditorCollabProps extends MemoizedProps {
  roomId: string
  mode?: EditorMode
  user?: AuthUserType
  activeFile?: File
  socket?: Socket
  onRoomStatusChanged?: (roomStatus: RoomStatus) => void
}

interface UseCodeEditorCollabReturn extends Omit<UseBaseInitReturn, 'baseInit' | 'setIsLoading'> {
  extensions?: Extension[]
  editorRef: RefObject<HTMLDivElement>
  isLoading: boolean
  key: number
  streamingDoc?: Text
  onCreateEditor: (view: EditorView) => void
  roomStatus: RoomStatus
  commentProps: Omit<UseCommentsPropsReturn, 'commentEffectRef' | 'onCommentIconClick'>
}

export const useCodeEditorCollab = ({
  roomId,
  mode = EditorMode.Owner,
  activeFile,
  socket,
  onRoomStatusChanged,
  user,
  preloadedCode,
  ...propsToMemoize
}: UseCodeEditorCollabProps): UseCodeEditorCollabReturn => {
  const modeRef = useRef(mode)
  const firstInit = useRef(true)
  const initializeBlockedRef = useRef(false)
  const editorView = useRef<EditorView | null>(null)
  const editorRef = useRef<HTMLDivElement | null>(null)
  const [roomStatus, setRoomStatus] = useState(RoomStatus.Active)

  const { cursorText, withTooltip, onChangeStreamingDocInfo, defaultFileName } =
    useMemoizedProps(propsToMemoize)

  const onCreateEditor = (view: EditorView): void => {
    editorView.current = view
  }

  const clearSocketData = useCallback((): void => {
    const selection = EditorSelection.range(0, 0, 0, 0)
    editorView.current?.dispatch({ selection })
    editorView.current?.destroy()
    unsubscribeSocket(socket)
  }, [])

  const { commentEffectRef, onCommentIconClick, ...commentProps } = useComments({
    editorView,
    socket,
    cursorText,
    roomId,
    activeFile: activeFile?._id!,
  })

  const { baseInit, setIsLoading, ...codeMirrorProps } = useInitCodemirror({
    socket,
    withTooltip,
    onChangeStreamingDocInfo,
    roomId,
    mode,
    user,
    cursorText,
    defaultFileName,
    preloadedCode,
    commentEffectRef,
    onCommentIconClick,
    fileExtension: activeFile?.extension,
  })

  useEffect(() => {
    onRoomStatusChanged?.(roomStatus)
  }, [roomStatus, onRoomStatusChanged])

  useEffect(() => {
    initializeBlockedRef.current = false
    firstInit.current = true
    modeRef.current = mode
  }, [mode, roomId])

  useEffect(() => {
    editorView.current?.destroy()

    if (!socket || !activeFile) {
      setIsLoading(false)
      return
    }

    if (initializeBlockedRef.current) {
      return
    }

    setRoomStatus(RoomStatus.Active)

    baseInit(activeFile._id)
  }, [socket, activeFile])

  useEffect(() => {
    window.addEventListener('beforeunload', clearSocketData)
    return () => {
      window.removeEventListener('beforeunload', clearSocketData)
      clearSocketData()
    }
  }, [clearSocketData])

  return {
    editorRef,
    onCreateEditor,
    roomStatus,
    commentProps,
    ...codeMirrorProps,
  }
}
