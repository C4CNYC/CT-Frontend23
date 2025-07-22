import { FileExtension } from '@root/src/types/lessons'
import { StudentFile } from '@root/src/redux/services/interfaces/workspace.interface'

const getDefaultNameByExtension = (ext: FileExtension) => {
  switch (ext) {
    case FileExtension.HTML:
      return 'index'
    case FileExtension.CSS:
      return 'style'
    case FileExtension.JS:
      return 'script'
    case FileExtension.JSON:
      return 'data'
    default:
      return 'file'
  }
}

export const useUniqueFileName = (
  extension: FileExtension | string,
  files: StudentFile[],
  isAllowMultipleSameType: boolean
): string => {
  const baseName = getDefaultNameByExtension(extension as FileExtension)

  const existingNames = files
    .filter((f) => f.extension === extension)
    .map((f) => f.name)

  if (!existingNames.includes(baseName)) return baseName

  if (!isAllowMultipleSameType) return baseName

  let index = 1
  let newName = `${baseName}_${index}`
  while (existingNames.includes(newName)) {
    index++
    newName = `${baseName}_${index}`
  }

  return newName
}
