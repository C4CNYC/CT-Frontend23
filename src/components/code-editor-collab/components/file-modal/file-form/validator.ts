import { Extensions } from "src/components/code-editor-collab/hook/constants";
import { File } from "src/components/code-editor-collab/hook/utils/collab/requests";
import { getFileExtension } from "src/utils/getFileExtension";

const validationList: string[] = [Extensions.Html, Extensions.Css, Extensions.Js];
const EMPTY_ERROR = "Cannot be empty";
const FILE_ERROR = `File should be with ${validationList.join(', ')} extension.`;
const FILE_EXIST_ERROR = 'File is already exist'

interface ValidateProps {
  fileName: string
  fileList: File[]
  isMultipleExtensionFiles: boolean
}

const isExtensionExist = (fileList: File[], extension: string) => 
  fileList.some(({ name }) => getFileExtension(name) === extension)

export const validate = ({
  fileName,
  fileList,
  isMultipleExtensionFiles
}: ValidateProps): string | null => {
  if (fileName.trim() === "") {
    return EMPTY_ERROR;
  }

  const isExist = fileList.some(({ name }) => name === fileName.trim())
  if (isExist) {
    return FILE_EXIST_ERROR;
  }

  const extension = getFileExtension(fileName);
  const isExtensionValid = extension !== null &&
    validationList.includes(extension);

  if (!isExtensionValid) {
    return FILE_ERROR;
  }

  if (!isMultipleExtensionFiles && isExtensionExist(fileList, extension)) {
    return `"${extension[0].toUpperCase()}${extension.slice(1)}" file is already exist`
  }

  return null;
}
