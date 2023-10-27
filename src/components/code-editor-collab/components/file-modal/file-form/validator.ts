import { getExtension } from "../utils";

const validationList = ['html', 'css', 'js'];
const EMPTY_ERROR = "Cannot be empty";
const FILE_ERROR = `File should be with ${validationList.join(', ')} extension.`;

export const validate = (fileName: string): string | null => {
  if (fileName.trim() === "") {
    return EMPTY_ERROR;
  }

  const extension = getExtension(fileName);
  const isExtensionValid = extension !== null && validationList.includes(extension);

  if (!isExtensionValid) {
    return FILE_ERROR;
  }

  return null;
}
