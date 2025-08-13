import { ILessonContentValidation } from '@/redux/services/interfaces/lessonContentValidation.interface'
import { BaseResponseInterface } from '@/utils/baseResponse.interface'

export interface IValidationMap {
  text: string
  valid: boolean
}

export function CheckValidationTests(
  code: string,
  validations: Array<ILessonContentValidation & BaseResponseInterface>,
  checked: IValidationMap[] = []
): IValidationMap[] {
  if (!validations) return []
  let noNLCode = code.replaceAll('\n', ' ')
  let valResults = new Array(...validations)
    .sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1))
    .map((validator) => {
      let valid = true //in case of error in regex, we pass this test
      let checkedBefore = checked.find((c) => c.text === validator.name)
      if (checkedBefore?.valid) {
        return {
          text: validator.name,
          valid: true,
        }
      }
      try {
        let reg = validator.regex.startsWith('/')
          ? eval(validator.regex)
          : new RegExp(validator.regex)
        valid =
          reg.test(code) ||
          reg.test(noNLCode) ||
          !!code.match(reg) ||
          code.replace(/\s/g, '') === validator.regex.replace(/\s/g, '')
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('error oldu', e)
      }

      return {
        text: validator.name,
        valid,
      }
    })
  return valResults
}
