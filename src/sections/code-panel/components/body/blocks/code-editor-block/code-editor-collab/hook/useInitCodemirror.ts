import { type MutableRefObject, useCallback, useState, useMemo, useEffect } from 'react'

import { indentUnit } from '@codemirror/language'
import { Compartment, Extension, StateEffect, Text } from '@codemirror/state'
import { EditorState } from '@codemirror/state'
import { EditorView } from '@codemirror/view'
import { basicSetup } from '@uiw/codemirror-extensions-basic-setup'
import { dracula } from '@uiw/codemirror-theme-dracula'
import { StateEffectType } from '@uiw/react-codemirror'
import { Socket } from 'socket.io-client'

import { useSelector } from '@/redux/store'
import { AuthUserType } from '@root/src/auth/types'
import { SocketEventsStudentMode } from '@root/src/sections/code-panel/lib/events/mode'

import { BASIC_SETUP, EditorMode } from './constants'
import { commentExtenstion } from './extensions/comments'
import type { CommentEffect } from './extensions/comments/types'
import { cursorExtension } from './extensions/cursors'
import type { Cursor } from './extensions/cursors/types'
import { peerExtension } from './extensions/peer'
import { type File, getDocument } from './requests'
import type { CommentPopupProps } from './useComments'
import { language } from './utils'

interface UseBaseInit {
  socket?: Socket
  withTooltip: boolean
  onChangeStreamingDocInfo?: (code: Record<string, string>) => void
  roomId: string
  lessonId?: string
  mode: EditorMode
  user?: AuthUserType
  cursorText: string
  defaultFileName: string
  preloadedCode?: string
  commentEffectRef: MutableRefObject<StateEffectType<CommentEffect> | null>
  onCommentIconClick: (props: CommentPopupProps | null) => void
}

export interface UseBaseInitReturn {
  key: number
  streamingDoc?: Text
  isLoading: boolean
  extensions?: Extension[]
  baseInit: (fileName: File) => Promise<void>
  setIsLoading: (isLoading: boolean) => void
  setStreamingDoc: (streamingDoc: Text) => void
  lineWrap: Compartment
}

export const useInitCodemirror = ({
  mode,
  socket,
  withTooltip,
  onChangeStreamingDocInfo,
  roomId,
  user,
  cursorText,
  defaultFileName,
  preloadedCode,
  commentEffectRef,
  onCommentIconClick,
}: UseBaseInit): UseBaseInitReturn => {
  const [key, setKey] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isCollabActive, setIsCollabActive] = useState(false)
  const [streamingDoc, setStreamingDoc] = useState<Text | undefined>()
  const [extensions, setExtensions] = useState<Extension[] | undefined>()

  const prevLessonId = useSelector((state) => state.codePanelGlobal.prevLessonId)

  const getLocalStorageRoomKey = (roomId: string) => `room_doc_${roomId}`
  const prevLessonJson = localStorage.getItem(getLocalStorageRoomKey(prevLessonId as string))

  const lineWrap = useMemo(() => new Compartment(), [])

  useEffect(() => {
    if (socket && mode === EditorMode.Owner) {
      socket.emit(SocketEventsStudentMode.JoinCollabModFeature, { roomId: user?.id })
      socket.on(SocketEventsStudentMode.StartOnlineMode, () => {
        setIsCollabActive(true)
        setTimeout(() => {
          socket.emit(SocketEventsStudentMode.OnlineStudentReady, { roomId: user?.id })
        }, 1000)
      })
      socket?.on(SocketEventsStudentMode.StopOnlineMode, async () => {
        // TURN OFF COLAB REVERT CODE
        // setIsCollabActive(false)
      })
    }
  }, [socket])

  const baseInit = useCallback(
    async (fileName: File) => {
      if (!isCollabActive && mode === EditorMode.Owner) {
        setExtensions([
          indentUnit.of('\t'),
          basicSetup(BASIC_SETUP),
          ...language(fileName),
          EditorState.lineSeparator.of('\n'),
          dracula,
          lineWrap.of(EditorView.lineWrapping),
        ])

        setKey((prev) => ++prev)
        setIsLoading(false)
        return
      }

      const addCursor = StateEffect.define<Cursor>()
      commentEffectRef.current = StateEffect.define<CommentEffect>()
      const { version, doc, cursorName, docInfo, updates } = await getDocument({
        roomId,
        fileName,
        socket,
        cursorName: user?.id ?? cursorText,
        defaultFileName,
        preloadedCode:
          (prevLessonId && JSON.parse(prevLessonJson as string)?.htmlBody?.join('')) ||
          preloadedCode,
      })

      setExtensions([
        indentUnit.of('\t'),
        basicSetup(BASIC_SETUP),
        ...language(fileName),
        EditorState.lineSeparator.of('\n'),
        dracula,
        lineWrap.of(EditorView.lineWrapping),
        ...(socket
          ? [
              peerExtension({
                socket,
                roomId,
                startVersion: version,
                fileName,
                addCursor,
                commentEffect: commentEffectRef.current,
              }),
              cursorExtension({
                cursorId: cursorName,
                tooltipText: cursorText,
                withTooltip,
                addCursor,
                userId: user?.id,
              }),
              commentExtenstion({
                updates,
                fileId: fileName.id,
                roomId,
                socket,
                onCommentIconClick,
              }),
            ]
          : []),
      ])

      onChangeStreamingDocInfo?.(docInfo)
      setStreamingDoc(doc)

      setKey((prev) => ++prev)
      setIsLoading(false)
    },
    [
      roomId,
      cursorText,
      withTooltip,
      socket,
      onChangeStreamingDocInfo,
      defaultFileName,
      preloadedCode,
      isCollabActive,
    ]
  )

  return {
    key,
    extensions,
    streamingDoc,
    setStreamingDoc,
    isLoading,
    baseInit,
    setIsLoading,
    lineWrap,
  }
}
