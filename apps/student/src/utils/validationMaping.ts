import { IValidation } from "src/redux/interfaces/content.interface";
import { BaseResponseInterface } from "@ct-nx/utils";

export interface IValidationMap {
  text: string;
  valid: boolean;
}

export function mapValidations(
  code: string,
  validations: Array<IValidation & BaseResponseInterface>
): IValidationMap[] {
  if (!validations) return [];
  return validations.map((validator) => ({
    text: validator.name,
    valid: new RegExp(validator.regex).test(code),
  }));
}
