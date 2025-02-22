export interface ILessonContentValidation {
  name: string
  regex: string
  testing_method: ValidationTestingMethod
}

export enum ValidationTestingMethod {
  Regex = 'regex',
  Manual = 'manual',
  Mocha = 'mocha',
  Chai = 'chai',
}
