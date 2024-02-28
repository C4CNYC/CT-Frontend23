import { type MutableRefObject, useCallback, useEffect, useState } from 'react'

import { indentUnit } from '@codemirror/language'
import { Compartment, Extension, StateEffect, Text } from '@codemirror/state'
import { EditorView } from '@codemirror/view'
import { basicSetup } from '@uiw/codemirror-extensions-basic-setup'
import { dracula } from '@uiw/codemirror-theme-dracula'
import { StateEffectType } from '@uiw/react-codemirror'
import { Socket } from 'socket.io-client'

import { AuthUserType } from '@/auth/types'
import { commentExtenstion } from '@/sections/code-panel/code-editor/lib/extensions/comments'
import type { CommentEffect } from '@/sections/code-panel/code-editor/lib/extensions/comments/types'
import { cursorExtension } from '@/sections/code-panel/code-editor/lib/extensions/cursors'
import type { Cursor } from '@/sections/code-panel/code-editor/lib/extensions/cursors/types'
import { peerExtension } from '@/sections/code-panel/code-editor/lib/extensions/peer'

import { language } from '../utils'
import { type File, getDocument } from '../utils/requests'

import { BASIC_SETUP, EditorMode } from './constants'
import type { CommentPopupProps } from './useComments'

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
}

export const useInitCodemirror = ({
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
}: UseBaseInit): UseBaseInitReturn => {
  const [key, setKey] = useState(0)
  const [streamingDoc, setStreamingDoc] = useState<Text | undefined>()
  const [isLoading, setIsLoading] = useState(true)
  const [extensions, setExtensions] = useState<Extension[] | undefined>()

  useEffect(() => {
    setStreamingDoc(undefined)
  }, [roomId])

  const baseInit = useCallback(
    async (fileName: File) => {
      const lineWrap = new Compartment()
      const addCursor = StateEffect.define<Cursor>()
      commentEffectRef.current = StateEffect.define<CommentEffect>()

      const { version, doc, cursorName, docInfo, updates } = await getDocument({
        roomId,
        fileName,
        socket,
        cursorName: user?.id ?? cursorText,
        defaultFileName,
        preloadedCode,
      })

      setExtensions([
        indentUnit.of('\t'),
        basicSetup(BASIC_SETUP),
        ...language(fileName),
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
    extensions,
    streamingDoc,
    isLoading,
    baseInit,
    setIsLoading,
  }
}
