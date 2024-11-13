import { type MutableRefObject, useCallback, useState, useMemo } from 'react'

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
  isLoading: boolean
  streamingDoc?: Text
  lineWrap: Compartment
  extensions?: Extension[]
  isCollabActive?: boolean
  setIsLoading: (isLoading: boolean) => void
  setStreamingDoc: (streamingDoc: Text) => void
  baseInit: (fileName: File, _preloadedCode: string) => Promise<void>
}

export const useInitCodemirror = ({
  user,
  roomId,
  socket,
  cursorText,
  withTooltip,
  preloadedCode,
  defaultFileName,
  commentEffectRef,
  onCommentIconClick,
  onChangeStreamingDocInfo,
}: UseBaseInit): UseBaseInitReturn => {
  const [key, setKey] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [streamingDoc, setStreamingDoc] = useState<Text | undefined>()
  const [extensions, setExtensions] = useState<Extension[] | undefined>()

  const prevLessonId = useSelector((state) => state.codePanelGlobal.prevLessonId)

  const getLocalStorageRoomKey = (roomId: string) => `room_doc_${roomId}`
  const prevLessonJson = localStorage.getItem(getLocalStorageRoomKey(prevLessonId as string))

  const lineWrap = useMemo(() => new Compartment(), [])

  const baseInit = useCallback(
    async (fileName: File, _preloadedCode: string) => {
      const addCursor = StateEffect.define<Cursor>()
      commentEffectRef.current = StateEffect.define<CommentEffect>()
      const { version, doc, cursorName, docInfo, updates } = await getDocument({
        roomId,
        fileName,
        socket,
        cursorName: user?.id ?? cursorText,
        defaultFileName,
        preloadedCode:
          _preloadedCode ||
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
    ]
  )

  return {
    key,
    baseInit,
    lineWrap,
    isLoading,
    extensions,
    streamingDoc,
    setStreamingDoc,
    setIsLoading,
  }
}
