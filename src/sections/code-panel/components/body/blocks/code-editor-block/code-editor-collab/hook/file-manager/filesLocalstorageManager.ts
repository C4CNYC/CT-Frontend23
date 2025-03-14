import { StudentFile } from '@root/src/redux/services/interfaces/workspace.interface'

interface LocalStorageFiles {
  [id: string]: StudentFile
}
export type Intent = 'forceThisVersion' | 'ignoreThisVersion'

export function unauthFileLocalStorageManger(rootKey: string) {
  const getLocalStorageFiles = (key: string = rootKey): LocalStorageFiles => {
    try {
      const localStorageFiles = localStorage.getItem(key)

      if (localStorageFiles) {
        return JSON.parse(localStorageFiles) as LocalStorageFiles
      }

      return {}
    } catch (e) {
      return {}
    }
  }

  const setLocalStorageFiles = (files: LocalStorageFiles) => {
    localStorage.setItem(rootKey, JSON.stringify(files))
  }

  const _getFiles = (files: StudentFile[], intent:  Intent) => {
    const localStorageFiles = getLocalStorageFiles()

    for (const file of files) {
      if (intent === 'ignoreThisVersion') {
        const fileWithSameName = Object.values(localStorageFiles).find(
          (f) => f.name === file.name && f.extension === file.extension
        )

        if (fileWithSameName) {
          continue
        }
      }
      if (!localStorageFiles[file.id]) {
        _addFile(file, intent)
      }
    }

    return Object.values(getLocalStorageFiles())
  }

  const _getFile = (id: string) => {
    const files = getLocalStorageFiles()

    return files[id]
  }

  const _addFile = (file: StudentFile, intent: Intent) => {
    console.log('add file', file, intent)
    const files = getLocalStorageFiles()
    
    if (files[file.id]) {
      if (intent === 'ignoreThisVersion')
        return
      if (files[file.id].body.length > file.body.length) {
        return         
      }
    }

    files[file.id] = file

    setLocalStorageFiles(files)

    return file
  }

  const _updateFile = (id: string, body: Partial<Omit<StudentFile, 'lessonId' | 'id'>>) => {
    const files = getLocalStorageFiles()

    if (!files[id]) {
      return
    }

    files[id] = {
      ...files[id],
      ...body,
    }

    setLocalStorageFiles(files)
  }

  const _carryOverFiles = (key: string, files: StudentFile[], skipIfFileExists = false) => {
    const filesToCarryOver = getLocalStorageFiles(key)
    const localStorageFiles = getLocalStorageFiles()

    const mergedFiles = {
      ...filesToCarryOver,
      ...localStorageFiles,
    }

    for (const file of Object.values(mergedFiles)) {
      if (!localStorageFiles[file.id] && file.body.length > 10) {
        _addFile(file, 'forceThisVersion' )
      }
    }
    if (skipIfFileExists) return Object.values(getLocalStorageFiles())
    for (const file of files) {
      if (!mergedFiles[file.id]) {
        _addFile(file, 'forceThisVersion' )
      }
    }

    return Object.values(getLocalStorageFiles())
  }

  const _removeFile = (id: string) => {
    const files = getLocalStorageFiles()

    if (!files[id]) {
      return
    }

    delete files[id]

    setLocalStorageFiles(files)
  }

  return {
    getFile: _getFile,
    addFile: _addFile,
    getFiles: _getFiles,
    updateFile: _updateFile,
    removeFile: _removeFile,
    carryOverFiles: _carryOverFiles,
    getLocalStorageFiles,
  }
}
