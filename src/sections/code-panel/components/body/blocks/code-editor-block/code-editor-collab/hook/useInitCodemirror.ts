import { useCallback, useState, useMemo } from 'react'

import { Compartment, Extension, Text } from '@codemirror/state'
import { EditorView } from '@codemirror/view'
import { basicSetup } from '@uiw/codemirror-extensions-basic-setup'
import { dracula } from '@uiw/codemirror-theme-dracula'

import { indentCompartment, noAutoIndent } from '@/sections/code-panel/utils/editor'
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

  const baseInit = useCallback(
    async (file: StudentFile) => {
      try {
        // Wait for language plugins to be dynamically loaded
        const languagePlugins = await language(file)

        setExtensions([
          indentCompartment.of(noAutoIndent),
          basicSetup(BASIC_SETUP),
          ...languagePlugins,
          dracula,
          lineWrap.of(EditorView.lineWrapping),
        ])

        setKey((prev) => ++prev)
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
      }
    },
    [lineWrap]
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
