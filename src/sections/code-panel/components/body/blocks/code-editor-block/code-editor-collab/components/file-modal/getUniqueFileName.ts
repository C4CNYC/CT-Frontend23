import { BaseResponseInterface } from '@/utils/baseResponse.interface'
import { ILessonPreloadFile } from '@root/src/redux/services/interfaces/courseUnits.interface'
import { FileExtension } from '@root/src/types/lessons'

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

export const getUniqueFileName = (
  extension: FileExtension | string,
  isAllowMultipleSameType: boolean,
  files?: Array<ILessonPreloadFile & BaseResponseInterface>,
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
