export const ILCV_type = ['regex', 'output', 'execute', 'manual'] as const
export type LCV_type = (typeof ILCV_type)[number]

export interface ILessonContentValidation {
  name: string
  regex: string
  description?: string
  type?: LCV_type
}
