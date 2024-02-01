import { BaseResponseInterface } from "@utils";
import { ILessonContentValidation } from "src/redux/services/interfaces/lessonContentValidation.interface";

export interface IValidationMap {
  text: string;
  valid: boolean;
}

export function mapValidations(
  code: string,
  validations: Array<ILessonContentValidation & BaseResponseInterface>
): IValidationMap[] {
  if (!validations) return [];
  return validations.map((validator) => ({
    text: validator.name,
    valid: new RegExp(validator.regex).test(code),
  }));
}
