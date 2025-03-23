import { type RefObject, useEffect, useState, useRef, useCallback } from 'react'

import type { Extension } from '@codemirror/state'
import type { Text } from '@codemirror/state'
import { EditorView } from '@codemirror/view'

import { StudentFile } from '@root/src/redux/services/interfaces/workspace.interface'
import { initListeners } from '@root/src/sections/code-panel/lib/listeners'

import { RoomStatus } from '../components/status-label'

import { useInitCodemirror, UseBaseInitReturn } from './useInitCodemirror'

export interface UseCodeEditorCollabProps {
  activeFile: StudentFile
  defaultFileName: string
  preloadedCode?: string
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
}

export const useCodeEditorCollab = ({
  activeFile,
  onRoomStatusChanged,
  defaultFileName,
  preloadedCode,
}: UseCodeEditorCollabProps): UseCodeEditorCollabReturn => {
  const firstInit = useRef(true)
  const initializeBlockedRef = useRef(false)
  const editorView = useRef<EditorView | null>(null)
  const editorRef = useRef<HTMLDivElement | null>(null)

  const [roomStatus, setRoomStatus] = useState(RoomStatus.Active)

  const { baseInit, setIsLoading, setStreamingDoc, ...codeMirrorProps } = useInitCodemirror({
    defaultFileName,
  })

  const onCreateEditor = (view: EditorView): void => {
    editorView.current = view
    initListeners(view, editorRef, { preloadedCode: preloadedCode ?? '' }, codeMirrorProps.lineWrap)
    if (editorRef?.current) {
      editorRef.current.style.fontSize = `14px`
    }
  }

  const runInitOwner = useCallback(
    async (isFirstInit: boolean): Promise<void> => {
      firstInit.current = false
      setRoomStatus(RoomStatus.Active)

      if (!isFirstInit) {
        await baseInit(activeFile)
        return
      }
    },
    [activeFile, baseInit]
  )

  useEffect(() => {
    onRoomStatusChanged?.(roomStatus)
  }, [roomStatus, onRoomStatusChanged])

  useEffect(() => {
    editorView.current?.destroy()

    if (initializeBlockedRef.current) return

    runInitOwner(firstInit.current)
  }, [])

  return {
    editorRef,
    onCreateEditor,
    roomStatus,
    setStreamingDoc,
    ...codeMirrorProps,
  }
}
