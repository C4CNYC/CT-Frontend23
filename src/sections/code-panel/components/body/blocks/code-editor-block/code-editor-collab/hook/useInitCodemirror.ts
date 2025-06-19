import { useCallback, useState, useMemo } from 'react'

import { Compartment, Extension, Text } from '@codemirror/state'
import { Prec } from '@codemirror/state'
import { EditorView, keymap, KeyBinding } from '@codemirror/view'
import { basicSetup } from '@uiw/codemirror-extensions-basic-setup'
import { dracula } from '@uiw/codemirror-theme-dracula'

import { StudentFile } from '@root/src/redux/services/interfaces/workspace.interface'

import { BASIC_SETUP } from './constants'
import { language } from './utils'

export interface UseBaseInitReturn {
  key: number
  streamingDoc?: Text
  isLoading: boolean
  extensions?: Extension[]
  baseInit: (fileName: StudentFile) => Promise<void>
  setIsLoading: (isLoading: boolean) => void
  setStreamingDoc: (streamingDoc: Text) => void
  lineWrap: Compartment
}

export const useInitCodemirror = (): UseBaseInitReturn => {
  const [key, setKey] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [streamingDoc, setStreamingDoc] = useState<Text | undefined>()
  const [extensions, setExtensions] = useState<Extension[] | undefined>()

  const lineWrap = useMemo(() => new Compartment(), [])

  const customKeymap: KeyBinding[] = [
    {
      key: 'Enter',
      run: (view) => {
        view.dispatch(view.state.replaceSelection('\n'))
        return true
      },
    },
  ]

  const baseInit = useCallback(async (file: StudentFile) => {
    setExtensions([
      Prec.highest(keymap.of(customKeymap)),
      basicSetup(BASIC_SETUP),
      ...language(file),
      dracula,
      lineWrap.of(EditorView.lineWrapping),
    ])

    setKey((prev) => ++prev)
    setIsLoading(false)
    return
  }, [])

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
