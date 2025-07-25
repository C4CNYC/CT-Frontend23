import { StudentFile } from '@root/src/redux/services/interfaces/workspace.interface'
import { FileExtension } from '@root/src/types/lessons'

const getDefaultNameByExtension = (ext: FileExtension) => {
  switch (ext.toLowerCase()) {
    case 'html':
      return 'index'
    case 'css':
      return 'style'
    case 'js':
    case 'py':
      return 'script'
    case 'java':
    case 'c':
    case 'cpp':
      return 'ain'
    case 'json':
      return 'data'
    default:
      return 'file'
  }
}

export const getUniqueFileName = (
  extension: FileExtension,
  files: StudentFile[],
  isAllowMultipleSameType: boolean
): string => {
  const baseName = getDefaultNameByExtension(extension as FileExtension)

  const existingNames = files.filter((f) => f.extension === extension).map((f) => f.name)

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
