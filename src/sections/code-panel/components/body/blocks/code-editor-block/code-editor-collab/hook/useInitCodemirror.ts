import { useCallback, useState } from 'react'

import { css } from '@codemirror/lang-css'
import { html } from '@codemirror/lang-html'
import { javascript } from '@codemirror/lang-javascript'
import { indentUnit } from '@codemirror/language'
import { Compartment, Extension, StateEffect } from '@codemirror/state'
import { EditorView } from '@codemirror/view'
import { basicSetup } from '@uiw/codemirror-extensions-basic-setup'
import { dracula } from '@uiw/codemirror-theme-dracula'
import type { Socket } from 'socket.io-client'

// import { langs } from "@uiw/codemirror-extensions-langs";
import { AuthUserType } from '@/auth/types'
import { getFileExtension } from '@/utils/getFileExtension'

import { BASIC_SETUP, EditorMode, Extensions } from '../../constants'

import { commentsExtension } from './utils/collab/comments'
import { contextMenuExtension } from './utils/collab/context-menu'
import { type Cursor, cursorExtension } from './utils/collab/cursors'
import { peerExtension } from './utils/collab/peer-extension'
import { File, getDocument } from './utils/collab/requests'

const langMap = {
  [Extensions.Css]: () => css(),
  [Extensions.Html]: () => html(),
  [Extensions.Js]: () => javascript(),
}

const language = ({ name }: File): any[] => {
  const extension = getFileExtension(name)

  return extension != null ? [langMap[extension as keyof typeof langMap]()] : []
}

interface UseBaseInit {
  socket?: Socket
  withTooltip: boolean
  onChange?: (code: Record<string, string>) => void
  roomId: string
  lessonId?: string
  mode: EditorMode
  user: AuthUserType
  cursorText: string
  defaultFileName: string
  preloadedCode?: string
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
}: UseBaseInit): UseBaseInitReturn => {
  const [key, setKey] = useState(0)
  const [doc, setDoc] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [extensions, setExtensions] = useState<Extension[] | undefined>()

  const baseInit = useCallback(
    async (fileName: File) => {
      const lineWrap = new Compartment()
      const addCursor = StateEffect.define<Cursor>()

      const { version, doc, cursorName, docInfo } = await getDocument({
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
              }),
              cursorExtension({
                cursorId: cursorName,
                tooltipText: cursorText,
                withTooltip,
                addCursor,
                userId: user?.id,
              }),
            ]
          : []),

        contextMenuExtension({
          userId: user?.id,
        }),
        commentsExtension({
          userId: user?.id,
        }),
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

      setDoc(docStr)
      setKey((prev) => ++prev)
      setIsLoading(false)
    },
    [roomId, cursorText, withTooltip, socket, onChange, defaultFileName]
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
