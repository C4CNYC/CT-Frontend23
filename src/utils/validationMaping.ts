import { ILessonContentValidation } from '@/redux/services/interfaces/lessonContentValidation.interface'
import { BaseResponseInterface } from '@/utils/baseResponse.interface'

export interface IValidationMap {
  text: string
  valid: boolean
}

export function mapValidations(
  code: string,
  validations: Array<ILessonContentValidation & BaseResponseInterface>
): IValidationMap[] {
  if (!validations) return []

  return validations.map((validator) => ({
    text: validator.name,
    valid:
      new RegExp(validator.regex).test(code) ||
      !!code.match(validator.regex) ||
      code.replace(/\s/g, '') === validator.regex.replace(/\s/g, ''),
  }))
}
