import { useMemo } from 'react'

import { useGetLessonFilesQuery } from '@root/src/redux/services/manager/lesson-content-manager'
import { FileExtension } from '@root/src/types/lessons'

const baseNames: Record<FileExtension, string> = {
  [FileExtension.HTML]: 'index',
  [FileExtension.CSS]: 'style',
  [FileExtension.JSON]: 'data',
  [FileExtension.JS]: 'script',
}

export function useUniqueFilename(lessonId: string, contentId: string) {
  const { data: allFiles, isLoading } = useGetLessonFilesQuery({ lessonId })

  const existingNamesByExt = useMemo(() => {
    const result: Record<string, Set<string>> = {}
    for (const file of allFiles ?? []) {
      const ext = file.extension.toLowerCase()
      if (!result[ext]) result[ext] = new Set()
      result[ext].add(file.name)
    }
    return result
  }, [allFiles])

  const getUniqueName = (extension: keyof typeof baseNames): string => {
    const base = baseNames[extension]
    const existing = existingNamesByExt[extension] ?? new Set()

    if (!existing.has(base)) return base

    let i = 1
    while (true) {
      const candidate = `${base}_${i}`
      if (!existing.has(candidate)) return candidate
      i++
    }
  }

  return {
    getUniqueName,
    allFiles,
    isLoading,
  }
}
