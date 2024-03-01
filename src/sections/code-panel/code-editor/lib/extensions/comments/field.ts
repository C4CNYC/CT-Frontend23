import { type DecorationSet, EditorView, Decoration } from '@codemirror/view'
import { RangeSet, RangeValue, StateEffect, StateField } from '@uiw/react-codemirror'

import { COMMENT_TYPE } from '../../hooks/constants'

import type { CommentEffect, CommentExtensionProps } from './types'
import { CommentWidget } from './widget'

interface UpdateEffectProps extends Omit<CommentExtensionProps, 'updates'> {
  transactions: RangeSet<RangeValue>
  effect: StateEffect<CommentEffect>
}

const updateEffect = ({ transactions, effect, ...other }: UpdateEffectProps) => {
  return transactions.update({
    add:
      effect.value.status === 'deleted'
        ? []
        : [
            Decoration.widget({
              widget: new CommentWidget({ ...effect.value, ...other }),
              block: false,
              id: effect.value.id,
            }).range(effect.value.to, effect.value.to),
          ],
    filter: (_, __, value) => {
      const isUniq = value.spec.id !== effect.value.id
      const isReadyToRender = isUniq && value.spec.status !== 'deleted'

      if (!isReadyToRender) {
        value.spec.widget.destroy()
      }

      return isReadyToRender
    },
  })
}

export const getCommentField = ({ updates, ...other }: CommentExtensionProps) =>
  StateField.define<DecorationSet>({
    create() {
      let transactions = RangeSet.of([])

      updates.forEach(({ effects }) => {
        effects?.forEach((effect) => {
          if (effect.value.type === COMMENT_TYPE) {
            transactions = updateEffect({ transactions, effect, ...other })
          }
        })
      })

      return transactions as RangeSet<Decoration>
    },

    update(value, { effects, changes }) {
      let transactions = value.map(changes)

      effects.forEach((effect) => {
        if (effect.value.type === COMMENT_TYPE) {
          transactions = updateEffect({ transactions, effect, ...other }) as RangeSet<Decoration>
        }
      })

      return transactions
    },
    provide: (f) => EditorView.decorations.from(f),
  })
