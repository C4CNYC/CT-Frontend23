import { type MutableRefObject, useCallback, useState } from 'react'

import { indentUnit } from '@codemirror/language'
import { Compartment, Extension, StateEffect } from '@codemirror/state'
import { EditorView } from '@codemirror/view'
import { basicSetup } from '@uiw/codemirror-extensions-basic-setup'
import { dracula } from '@uiw/codemirror-theme-dracula'
import { StateEffectType } from '@uiw/react-codemirror'
import { Socket } from 'socket.io-client'

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
  onChange?: (code: Record<string, string>) => void
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
  doc: string
  isLoading: boolean
  extensions?: Extension[]
  baseInit: (fileName: File) => Promise<void>
  setIsLoading: (isLoading: boolean) => void
}

export const useInitCodemirror = ({
  socket,
  withTooltip,
  onChange,
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
  const [doc, setDoc] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [extensions, setExtensions] = useState<Extension[] | undefined>()

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
      onChange?.(docInfo)

      let docStr = ''
      const docStrFromStreaming = doc?.toString()
      if (docStrFromStreaming) {
        docStr = docStrFromStreaming
      }

      if (mode === EditorMode.Owner) {
        if (user && lessonId) {
          const val = localStorage.getItem(`user_lesson_code_${user.id}_${lessonId}`)
          if (val) {
            try {
              const docFromLocalStorage = JSON.parse(val) as Record<string, string>
              const strFromLocalStorage = (
                docFromLocalStorage?.htmlBody as unknown as string[]
              )?.join('')
              if (strFromLocalStorage) {
                docStr = strFromLocalStorage
              }
            } catch (e) {}
          }
        }
      }
      if (!docStr) {
        setDoc(preloadedCode as string)
      } else {
        setDoc(docStr)
      }

      setKey((prev) => ++prev)
      setIsLoading(false)
    },
    [roomId, cursorText, withTooltip, socket, onChange, defaultFileName, preloadedCode]
  )

  return {
    key,
    extensions,
    doc,
    isLoading,
    baseInit,
    setIsLoading,
  }
}
