import { type Extension, StateEffectType } from '@codemirror/state'
import { EditorView } from '@codemirror/view'

import { getCursorField } from './field'
import { cursorBaseTheme } from './theme'
import type { Cursor } from './types'

interface CursorExtentionProps {
  cursorId: string
  tooltipText: string
  withTooltip: boolean
  addCursor: StateEffectType<Cursor>
  userId?: string
}

export const cursorExtension = ({
  cursorId,
  tooltipText,
  withTooltip,
  addCursor,
  userId,
}: CursorExtentionProps): Extension[] => {
  return [
    getCursorField(addCursor, withTooltip),
    cursorBaseTheme,
    EditorView.updateListener.of((update) => {
      update.transactions.forEach((e) => {
        if (e.selection) {
          update.view.dispatch({
            effects: addCursor.of({
              id: cursorId,
              from: e.selection.ranges[0].from,
              to: e.selection.ranges[0].to,
              tooltipText,
              userId,
            }),
          })
        }
      })
    }),
  ]
}
