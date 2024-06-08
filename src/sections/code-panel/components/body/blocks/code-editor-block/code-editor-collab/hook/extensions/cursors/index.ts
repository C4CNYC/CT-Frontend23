import { type Extension, StateEffectType } from '@codemirror/state'
import { EditorView } from '@codemirror/view'

import { EffectType } from '@root/src/sections/code-panel/components/body/blocks/code-editor-block/code-editor-collab/hook/constants'

import { getCursorField } from './field'
import { cursorBaseTheme } from './theme'
import type { Cursor } from './types'

interface CursorExtentionProps {
  tooltipText: string
  withTooltip: boolean
  addCursor: StateEffectType<Cursor>
  userId?: string
}

export const cursorExtension = ({
  tooltipText,
  withTooltip,
  addCursor,
  userId,
}: CursorExtentionProps): Extension[] => {
  return [
    getCursorField(addCursor, withTooltip, userId),
    cursorBaseTheme,
    EditorView.updateListener.of((update) => {
      update.transactions.forEach((e) => {
        if (e.selection) {
          update.view.dispatch({
            effects: addCursor.of({
              id: userId!,
              from: e.selection.ranges[0].from,
              to: e.selection.ranges[0].to,
              tooltipText,
              userId,
              type: EffectType.SELECTION,
            }),
          })
        }
      })
    }),
  ]
}
