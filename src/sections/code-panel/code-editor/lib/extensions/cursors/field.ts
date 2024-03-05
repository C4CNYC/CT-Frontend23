import {
  Decoration,
  DecorationSet,
  EditorView,
  StateEffectType,
  StateField,
} from '@uiw/react-codemirror'

import type { Cursor } from './types'
import { TooltipWidget } from './widget'

export const getCursorField = (addCursor: StateEffectType<Cursor>, withTooltip: boolean) => {
  const cursorsItems = new Map<string, number>()

  return StateField.define<DecorationSet>({
    create() {
      return Decoration.none
    },
    update(cursors, tr) {
      let cursorTransacions = cursors.map(tr.changes)

      for (const e of tr.effects)
        if (e.is(addCursor)) {
          const addUpdates = []
          if (!cursorsItems.has(e.value.id)) cursorsItems.set(e.value.id, cursorsItems.size)

          if (e.value.from !== e.value.to) {
            const className = `cm-highlight-${(cursorsItems.get(e.value.id)! % 8) + 1}`

            addUpdates.push(
              Decoration.mark({ class: className, id: e.value.id }).range(e.value.from, e.value.to)
            )
          }

          addUpdates.push(
            Decoration.widget({
              widget: new TooltipWidget({
                id: e.value.id,
                name: e.value.tooltipText,
                color: cursorsItems.get(e.value.id)!,
                pos: e.value.to,
                withTooltip,
                userId: e.value.userId,
              }),
              block: false,
              id: e.value.id,
            }).range(e.value.to, e.value.to)
          )

          cursorTransacions = cursorTransacions.update({
            add: addUpdates,
            filter: (_, __, value) => value?.spec?.id !== e.value.id,
          })
        }

      return cursorTransacions
    },
    provide: (f) => EditorView.decorations.from(f),
  })
}
