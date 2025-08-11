import { BaseResponseInterface } from '@/utils/baseResponse.interface'
import { ILessonPreloadFile } from '@root/src/redux/services/interfaces/courseUnits.interface'
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
      return 'main'
    case 'json':
      return 'data'
    default:
      return 'file'
  }
}

export const getUniqueFileName = (
  extension: FileExtension | string,
  isAllowMultipleSameType: boolean,
  files?: Array<ILessonPreloadFile & BaseResponseInterface>
): string => {
  if (!files || files.length === 0) return generateRandomName()

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

function generateRandomName() {
  return Math.random().toString(36).substring(7)
}
