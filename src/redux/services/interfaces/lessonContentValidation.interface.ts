export const ILCV_type = ['regex', 'output', 'error', 'code', 'input', 'action', 'signal'] as const
export type LCV_type = (typeof ILCV_type)[number]

export interface ILessonContentValidation {
  name: string
  regex: string
  description?: string
  type?: LCV_type
}
