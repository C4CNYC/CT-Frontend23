import { type MutableRefObject, useCallback, useEffect, useState } from 'react'

import type { Update } from '@codemirror/collab'
import { indentUnit } from '@codemirror/language'
import { Compartment, Extension, StateEffect, Text } from '@codemirror/state'
import { EditorView } from '@codemirror/view'
import { basicSetup } from '@uiw/codemirror-extensions-basic-setup'
import { dracula } from '@uiw/codemirror-theme-dracula'
import { StateEffectType } from '@uiw/react-codemirror'
import { Socket } from 'socket.io-client'

import { AuthUserType } from '@/auth/types'
import { commentExtension } from '@/sections/code-panel/code-editor/lib/extensions/comments'
import type { CommentEffect } from '@/sections/code-panel/code-editor/lib/extensions/comments/types'
import { cursorExtension } from '@/sections/code-panel/code-editor/lib/extensions/cursors'
import type { Cursor } from '@/sections/code-panel/code-editor/lib/extensions/cursors/types'
import { peerExtension } from '@/sections/code-panel/code-editor/lib/extensions/peer'
import { CodeDocument } from '@/types/code-document'

import { language } from '../utils'
import { type File, getDocument } from '../utils/requests'

import { BASIC_SETUP } from './constants'
import type { CommentPopupProps } from './useComments'

interface UseCodemirrorInitProps {
  socket?: Socket
  withTooltip: boolean
  onChangeStreamingDocInfo?: (code: CodeDocument) => void
  roomId: string
  user?: AuthUserType
  cursorText: string
  defaultFileName: string
  preloadedCode?: string
  commentEffectRef: MutableRefObject<StateEffectType<CommentEffect> | null>
  onCommentIconClick: (props: CommentPopupProps | null) => void
}

export interface UseCodemirrorInitReturn {
  key: number
  streamingDoc?: Text
  isInitializing: boolean
  setIsInitializing: (isInitializingCodemirror: boolean) => void
  extensions?: Extension[]
  init: (fileName: File) => Promise<void>
}

export const useCodemirrorInit = ({
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
}: UseCodemirrorInitProps): UseCodemirrorInitReturn => {
  const [key, setKey] = useState(0)
  const [streamingDoc, setStreamingDoc] = useState<Text | undefined>()
  const [isInitializing, setIsInitializing] = useState(true)
  const [extensions, setExtensions] = useState<Extension[] | undefined>()

  useEffect(() => {
    setStreamingDoc(undefined)
  }, [roomId])

  const setupExtensions = useCallback(
    ({
      version,
      fileName,
      cursorName,
      updates,
    }: {
      fileName: File
      version: number
      cursorName: string
      updates: Update[]
    }) => {
      const lineWrap = new Compartment()
      const addCursor = StateEffect.define<Cursor>()
      commentEffectRef.current = StateEffect.define<CommentEffect>()

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
              commentExtension({
                updates,
                fileId: fileName.id,
                roomId,
                socket,
                onCommentIconClick,
              }),
            ]
          : []),
      ])
    },
    []
  )

  const init = useCallback(
    async (fileName: File) => {
      const { version, doc, cursorName, docInfo, updates } = await getDocument({
        roomId,
        fileName,
        socket,
        cursorName: user?.id ?? cursorText,
        defaultFileName,
        preloadedCode,
      })

      setupExtensions({ version, fileName, cursorName, updates })

      onChangeStreamingDocInfo?.(docInfo)
      setStreamingDoc(doc)

      setKey((prev) => ++prev)
      setIsInitializing(false)
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
    isInitializing,
    init,
    setIsInitializing,
  }
}
