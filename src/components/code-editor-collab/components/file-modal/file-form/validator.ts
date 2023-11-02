import { getExtension } from "../utils";

const validationList = ['html', 'css', 'js'];
const EMPTY_ERROR = "Cannot be empty";
const FILE_ERROR = `File should be with ${validationList.join(', ')} extension.`;
const FILE_EXIST_ERROR = 'File is already exist'

export const validate = (fileName: string, fileList: string[]): string | null => {
  if (fileName.trim() === "") {
    return EMPTY_ERROR;
  }

  if (fileList.includes(fileName)) {
    return FILE_EXIST_ERROR;
  }

  const extension = getExtension(fileName);
  const isExtensionValid = extension !== null && validationList.includes(extension);

  if (!isExtensionValid) {
    return FILE_ERROR;
  }

  return null;
}
