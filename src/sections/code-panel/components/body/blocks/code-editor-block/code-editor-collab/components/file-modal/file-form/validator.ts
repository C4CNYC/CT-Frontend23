import { getFileExtension } from '@/utils/getFileExtension'
import { StudentFile } from '@root/src/redux/services/interfaces/workspace.interface'
import { Extensions } from '@root/src/sections/code-panel/components/body/blocks/code-editor-block/code-editor-collab/hook/constants'

const validationList: string[] = [Extensions.Html, Extensions.Css, Extensions.Js]
const EMPTY_ERROR = 'Cannot be empty'
const FILE_ERROR = `File should be with ${validationList.join(', ')} extension.`
const FILE_EXIST_ERROR = 'File is already exist'

interface ValidateProps {
  fileName: string
  fileList: StudentFile[]
  isMultipleExtensionFiles: boolean
}

const isExtensionExist = (fileList: StudentFile[], extension: string) =>
  fileList.some(({ name }) => getFileExtension(name) === extension)

export const validate = ({
  fileName,
  fileList,
  isMultipleExtensionFiles,
}: ValidateProps): string | null => {
  if (fileName.trim() === '') {
    return EMPTY_ERROR
  }

  const isExist = fileList.some(({ name }) => name === fileName.trim())
  if (isExist) {
    return FILE_EXIST_ERROR
  }

  const extension = getFileExtension(fileName)
  const isExtensionValid = extension !== null && validationList.includes(extension)

  if (!isExtensionValid) {
    return FILE_ERROR
  }

  if (!isMultipleExtensionFiles && isExtensionExist(fileList, extension)) {
    return `"${extension[0].toUpperCase()}${extension.slice(1)}" file is already exist`
  }

  return null
}
