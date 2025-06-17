import { StudentFile } from '@root/src/redux/services/interfaces/workspace.interface'

import { DEFAULT_FILE_ID } from '../file-manager/useFileManager'

export const docBuilder = (files: StudentFile[], activeFile: StudentFile | null, value: string) => {
  if (activeFile?.id === DEFAULT_FILE_ID) {
    return {
      htmlBody: value,
      cssBody: '',
      jsBody: '',
    }
  }
  // TODO: Update this logic in next iteration
  const doc = {
    htmlBody: files
      .filter((file) => file.extension === 'html')
      .map((file) => file)
      .map((file) => (file.id === activeFile?.id ? value : file.body))
      .join(' '),
    cssBody: files
      .filter((file) => file.extension === 'css')
      .map((file) => file)
      .map((file) => (file.id === activeFile?.id ? value : file.body))
      .join(' '),
    jsBody: files
      .filter((file) => file.extension === 'js')
      .map((file) => file)
      .map((file) => (file.id === activeFile?.id ? value : file.body))
      .join(' '),
  }

  return doc
}
