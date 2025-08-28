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
      let valid = false //in case of error in regex, we pass this test

      let checkedBefore = checked.find((c) => c.text === validator.name)
      if (checkedBefore?.valid) {
        return {
          text: validator.name,
          valid: true,
        }
      }

      const validatorType = validator.type || 'regex' // default to regex
      try {
        switch (validatorType) {
          default:
          case 'regex':
            let reg = validator.regex.startsWith('/')
              ? eval(validator.regex)
              : new RegExp(validator.regex)
            valid =
              reg.test(code) ||
              reg.test(noNLCode) ||
              !!code.match(reg) ||
              code.replace(/\s/g, '') === validator.regex.replace(/\s/g, '')
            break

          case 'output':
          case 'error':
          case 'code':
          case 'input':
          case 'action':
          case 'signal':
            break // Always false, will be checked externally
        }

        // console.log('Validator Type:', { validatorType, regex: validator.regex, valid })
      } catch (e) {
        // eslint-disable-next-line no-console
        // console.error('CheckValidationTests error:', e, 'validator:', validator)
      }

      return {
        text: validator.name,
        valid,
      }
    })
  return valResults
}
