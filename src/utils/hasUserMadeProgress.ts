import { ContentValidation } from '@/redux/slices/code-panel-global'

export function hasUserMadeProgress(contentValidations?: ContentValidation[]): boolean {
  if (!contentValidations || contentValidations.length === 0) {
    return false
  }

  return contentValidations.some(
    (item) =>
      Array.isArray(item.checkers) && item.checkers.some((checker) => checker.valid === true)
  )
}
