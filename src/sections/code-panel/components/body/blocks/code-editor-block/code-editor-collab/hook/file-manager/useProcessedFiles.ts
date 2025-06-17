import { useMemo } from 'react'

import { StudentFile } from '@root/src/redux/services/interfaces/workspace.interface'

// 4. Hook для обробки файлів
export const useProcessedFiles = (
  authFiles: StudentFile[],
  unauthFilesList: StudentFile[],
  isAuthenticated: boolean
) => {
  return useMemo(() => {
    if (!isAuthenticated) return unauthFilesList

    const authFilesWithoutHello = authFiles.filter(
      (file) => !file.name.toLowerCase().startsWith('hello_')
    )

    const unauthFilesNotSaved = unauthFilesList.filter(
      (file) =>
        !authFilesWithoutHello.find(
          (authFile) => authFile.name === file.name && authFile.extension === file.extension
        )
    )

    return [...authFilesWithoutHello, ...unauthFilesNotSaved]
  }, [authFiles, unauthFilesList, isAuthenticated])
}
