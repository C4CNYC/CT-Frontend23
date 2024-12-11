type LocalStorageProgress = {
  [lessonId: string]: number
}

export function tabsLocalStorageManger(rootKey: string) {
  const getLocalStorageProgress = (key: string = rootKey): LocalStorageProgress => {
    try {
      const LocalStorageProgress = localStorage.getItem(key)

      if (LocalStorageProgress) {
        return JSON.parse(LocalStorageProgress) as LocalStorageProgress
      }

      return {}
    } catch (e) {
      return {}
    }
  }

  const _setSlideIndex = (lessonId: string, slideIndex: number = 0) => {
    if (!lessonId || !slideIndex) {
      return
    }

    const LocalStorageProgress = getLocalStorageProgress()

    LocalStorageProgress[lessonId] = slideIndex

    localStorage
  }

  const _getProgress = (lessonId: string) => {
    if (!lessonId) {
      return 0
    }

    const LocalStorageProgress = getLocalStorageProgress()

    return LocalStorageProgress[lessonId]
  }

  return {
    getProgress: _getProgress,
    setSlideIndex: _setSlideIndex,
  }
}
