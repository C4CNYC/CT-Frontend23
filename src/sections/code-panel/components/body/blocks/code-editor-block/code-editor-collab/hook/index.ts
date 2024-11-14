import { type RefObject, useEffect, useState, useRef, useCallback, useMemo } from 'react'

import type { Extension } from '@codemirror/state'
import type { Text } from '@codemirror/state'
import { EditorView } from '@codemirror/view'
import type { Socket } from 'socket.io-client'

import { AuthUserType } from '@/auth/types'
import { useSelector } from '@/redux/store'
import { initListeners } from '@root/src/sections/code-panel/lib/listeners'

import { RoomStatus } from '../components/status-label'

import { EditorMode } from './constants'
import { type File, getFileInfo } from './requests'
import { type UseCommentsPropsReturn, useComments } from './useComments'
import { useInitCodemirror, UseBaseInitReturn } from './useInitCodemirror'
import { type MemoizedProps, useMemoizedProps } from './useMemoizedProps'
import { useModeSubscriptions } from './useModeSubscriotions'
import { EmitSocketEvents, unsubscribeSocket } from './utils/socket'

export interface UseCodeEditorCollabProps extends MemoizedProps {
  roomId: string
  mode?: EditorMode
  user?: AuthUserType
  activeFile: File
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
  const initRoomDataRef = useRef({ mode, roomId })
  const editorView = useRef<EditorView | null>(null)
  const editorRef = useRef<HTMLDivElement | null>(null)

  const [roomStatus, setRoomStatus] = useState(RoomStatus.Active)

  const lessonId = useSelector((state) => state.codePanelGlobal.lessonId)

  const {
    cursorText,
    withTooltip,
    onChangeStreamingDocInfo,
    setActiveFile,
    onResetFileManager,
    defaultFileName,
  } = useMemoizedProps(propsToMemoize)

  const { commentEffectRef, onCommentIconClick, ...commentProps } = useComments({
    editorView,
    socket,
    cursorText,
    roomId,
    activeFile: activeFile.id,
  })

  const { baseInit, setIsLoading, setStreamingDoc, isCollabActive, ...codeMirrorProps } =
    useInitCodemirror({
      socket,
      withTooltip,
      onChangeStreamingDocInfo,
      roomId,
      lessonId,
      mode,
      user,
      cursorText,
      defaultFileName,
      preloadedCode,
      commentEffectRef,
      onCommentIconClick,
    })

  const onCreateEditor = (view: EditorView): void => {
    editorView.current = view
    initListeners(view, editorRef, { preloadedCode: preloadedCode ?? '' }, codeMirrorProps.lineWrap)
    if (editorRef?.current) {
      editorRef.current.style.fontSize = `14px`
    }
  }

  const runInitSubOwner = useCallback(
    async (isFirstInit: boolean): Promise<void> => {
      firstInit.current = false
      // const isRoom = socket ? await isRoomExist(roomId, socket) : false

      // if (!isRoom) {
      //   initializeBlockedRef.current = true
      //   onResetFileManager()
      //   setRoomStatus(RoomStatus.Inactive)
      //   setIsLoading(false)
      //   return
      // }

      setRoomStatus(RoomStatus.Active)

      if (!isFirstInit) {
        await baseInit(activeFile, '')
        return
      }

      const fileInfo = socket ? await getFileInfo(roomId, socket) : undefined

      onResetFileManager(fileInfo)

      if (fileInfo?.activeFile === activeFile) {
        await runInitSubOwner(false)
      }
    },
    [activeFile, baseInit, onResetFileManager, socket]
  )

  const runInitOwner = useCallback(
    async (isFirstInit: boolean): Promise<void> => {
      firstInit.current = false
      setRoomStatus(RoomStatus.Active)

      const fileInfo = socket && isCollabActive ? await getFileInfo(roomId, socket) : null

      if (!isFirstInit || fileInfo == null) {
        await baseInit(activeFile, '')
        return
      }

      onResetFileManager(fileInfo)

      if (fileInfo.activeFile.id === activeFile.id) {
        await runInitOwner(false)
      }
    },
    [activeFile, baseInit, onResetFileManager, socket, isCollabActive]
  )

  const runInitWatcher = useCallback(async (): Promise<void> => {
    if (!socket) return

    firstInit.current = false
    // const isRoom = socket ? await isRoomExist(roomId, socket) : false

    // if (!isRoom) {
    //   initializeBlockedRef.current = true
    //   onResetFileManager()
    //   setIsLoading(false)
    //   setRoomStatus(RoomStatus.Inactive)
    //   return
    // }

    setRoomStatus(RoomStatus.Active)

    let _activeFile = activeFile
    const fileInfo = socket ? await getFileInfo(roomId, socket) : undefined

    if (fileInfo != null) {
      const shouldChangeFile =
        fileInfo.activeFile != null && fileInfo.activeFile.id !== activeFile.id

      if (shouldChangeFile) {
        onResetFileManager(fileInfo)
        return
      }

      _activeFile = fileInfo.activeFile ?? activeFile
    }

    await baseInit(_activeFile, '')
  }, [activeFile, baseInit, setActiveFile, socket, onResetFileManager])

  useModeSubscriptions({
    roomId,
    roomStatus,
    initializeBlockedRef,
    runInitSubOwner,
    runInitWatcher,
    mode,
    socket,
    onChangeStreamingDocInfo,
  })

  const initialize = useMemo(
    () => ({
      [EditorMode.Owner]: runInitOwner,
      [EditorMode.SubOwner]: runInitSubOwner,
      [EditorMode.Watcher]: runInitWatcher,
    }),
    [runInitWatcher, runInitOwner, runInitSubOwner]
  )

  const clearSocketData = useCallback((): void => {
    if (initRoomDataRef.current.mode === EditorMode.Owner) {
      socket?.emit(EmitSocketEvents.DeleteRoom, initRoomDataRef.current.roomId)
    }

    unsubscribeSocket(socket)
    editorView.current?.destroy()
  }, [])

  useEffect(() => {
    window.addEventListener('beforeunload', clearSocketData)
    return () => {
      window.removeEventListener('beforeunload', clearSocketData)
      clearSocketData()
    }
  }, [])

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

    if (initializeBlockedRef.current) return

    initialize[modeRef.current](firstInit.current)
  }, [initialize])

  return {
    editorRef,
    onCreateEditor,
    roomStatus,
    commentProps,
    setStreamingDoc,
    ...codeMirrorProps,
  }
}
