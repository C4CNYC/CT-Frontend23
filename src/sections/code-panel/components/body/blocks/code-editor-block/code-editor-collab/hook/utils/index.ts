import { LanguageSupport } from '@codemirror/language'
import { EditorView } from '@uiw/react-codemirror'

import { StudentFile } from '@root/src/redux/services/interfaces/workspace.interface'
import { getFileExtension } from '@root/src/utils/getFileExtension'

import { Extensions } from '../constants'

export const language = async (file: StudentFile): Promise<LanguageSupport[]> => {
  if (!file) return []

  const extension = getFileExtension(file.extension)
  if (extension == null) return []

  // Dynamically load language plugins based on extension
  try {
    switch (extension) {
      case Extensions.Css:
        const { css } = await import('@codemirror/lang-css')
        return [css()]
      case Extensions.Html:
        const { html } = await import('@codemirror/lang-html')
        return [html({ autoCloseTags: false })]
      case Extensions.Js:
        const { javascript } = await import('@codemirror/lang-javascript')
        return [javascript()]
      case Extensions.Json:
        const { json } = await import('@codemirror/lang-json')
        return [json()]
      case Extensions.Py:
        const { python } = await import('@codemirror/lang-python')
        return [python()]
      case Extensions.Java:
        const { javascript: javaLang } = await import('@codemirror/lang-javascript')
        return [javaLang()]
      case Extensions.Go:
        return []
      case Extensions.C:
      case Extensions.Cpp:
        return []
      default:
        return []
    }
  } catch (error) {
    // console.error(`Error loading language support for ${extension}:`, error)
    return []
  }
}

export const getSelectionRange = (view: EditorView | null) => {
  if (view == null) {
    return null
  }

  const { from, to } = view.state.selection.ranges[0]

  return { from, to, doc: view.state.doc.sliceString(from, to) }
}
