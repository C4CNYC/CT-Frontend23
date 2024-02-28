import { css } from '@codemirror/lang-css'
import { html } from '@codemirror/lang-html'
import { javascript } from '@codemirror/lang-javascript'
import { LanguageSupport } from '@codemirror/language'
import { EditorView } from '@uiw/react-codemirror'

import { getFileExtension } from '@/utils/getFileExtension'

import { Extensions } from '../hooks/constants'

import type { File } from './requests'

export const getSelectionRange = (view: EditorView | null) => {
  if (view == null) {
    return null
  }

  const { from, to } = view.state.selection.ranges[0]

  return { from, to, doc: view.state.doc.sliceString(from, to) }
}

const langMap = {
  [Extensions.Css]: () => css(),
  [Extensions.Html]: () => html(),
  [Extensions.Js]: () => javascript(),
}

export const language = ({ name }: File): LanguageSupport[] => {
  const extension = getFileExtension(name)

  return extension != null ? [langMap[extension as keyof typeof langMap]()] : []
}
