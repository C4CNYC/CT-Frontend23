import { type MutableRefObject, useCallback, useState } from 'react'

import { html } from '@codemirror/lang-html'
import { indentUnit } from '@codemirror/language'
import { Compartment, Extension, StateEffect, Text } from '@codemirror/state'
import { EditorView } from '@codemirror/view'
import { basicSetup } from '@uiw/codemirror-extensions-basic-setup'
import { dracula } from '@uiw/codemirror-theme-dracula'
import { StateEffectType } from '@uiw/react-codemirror'
import { useSelector } from 'react-redux'
import { Socket } from 'socket.io-client'

import { AuthUserType } from '@root/src/auth/types'
import { RootState } from '@root/src/redux/store'

import { BASIC_SETUP, EditorMode, Extensions } from './constants'
import { commentExtenstion } from './extensions/comments'
import type { CommentEffect } from './extensions/comments/types'
import { cursorExtension } from './extensions/cursors'
import type { Cursor } from './extensions/cursors/types'
import { peerExtension } from './extensions/peer'
import { getDocument } from './requests'
import type { CommentPopupProps } from './useComments'
import { language } from './utils'

interface UseBaseInit {
  socket?: Socket
  fileExtension?: Extensions
  withTooltip: boolean
  roomId: string
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
  baseInit: (file_id: string) => Promise<void>
  setIsLoading: (isLoading: boolean) => void
}

export const useInitCodemirror = ({
  socket,
  withTooltip,
  roomId,
  user,
  cursorText,
  defaultFileName,
  preloadedCode,
  commentEffectRef,
  onCommentIconClick,
  fileExtension,
}: UseBaseInit): UseBaseInitReturn => {
  const [key, setKey] = useState(0)
  const [streamingDoc, setStreamingDoc] = useState<Text | undefined>()
  const [isLoading, setIsLoading] = useState(true)
  const [extensions, setExtensions] = useState<Extension[] | undefined>()

  const lesson_id = useSelector((state: RootState) => state.codePanelGlobal.lessonId)
  const course_id = useSelector((state: RootState) => state.codePanelGlobal.courseId)
  const unit_id = useSelector((state: RootState) => state.codePanelGlobal.unitId)

  const baseInit = useCallback(
    async (file_id: string) => {
      if (!lesson_id || !course_id || !unit_id) return

      const lineWrap = new Compartment()
      const addCursor = StateEffect.define<Cursor>()
      commentEffectRef.current = StateEffect.define<CommentEffect>()
      const { version, doc, docInfo, updates } = await getDocument({
        socket,
        lesson_id,
        course_id,
        unit_id,
        roomId_fileId: `${roomId}_${file_id}`,
        cursorName: user?.id ?? cursorText,
      })

      setExtensions([
        indentUnit.of('\t'),
        basicSetup(BASIC_SETUP),
        ...language(fileExtension ?? Extensions.Html),
        html(),
        dracula,
        lineWrap.of(EditorView.lineWrapping),

        ...(socket
          ? [
              peerExtension({
                socket,
                roomId_fileId: `${roomId}_${file_id}`,
                startVersion: version,
                addCursor,
                commentEffect: commentEffectRef.current,
              }),
              cursorExtension({
                tooltipText: cursorText,
                withTooltip,
                addCursor,
                userId: user?.id,
              }),
              commentExtenstion({
                updates,
                fileId: 'index.html',
                roomId,
                socket,
                onCommentIconClick,
              }),
            ]
          : []),
      ])

      setStreamingDoc(doc)

      setKey((prev) => ++prev)
      setIsLoading(false)
    },
    [
      roomId,
      cursorText,
      withTooltip,
      socket,
      defaultFileName,
      preloadedCode,
      fileExtension,
      lesson_id,
      course_id,
      unit_id,
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
