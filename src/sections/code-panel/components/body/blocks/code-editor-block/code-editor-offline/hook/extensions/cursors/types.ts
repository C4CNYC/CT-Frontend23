import { EffectType } from '@root/src/sections/code-panel/components/body/blocks/code-editor-block/code-editor-collab/hook/constants'

export interface Cursor {
  id: string
  from: number
  to: number
  tooltipText: string
  userId?: string
  type: EffectType
}
