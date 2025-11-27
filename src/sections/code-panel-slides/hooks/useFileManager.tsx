import { useState, useEffect } from 'react'

import { StudentFile } from '@root/src/redux/services/interfaces/workspace.interface'
import { useUpdateStudentFileMutation } from '@root/src/redux/services/manager/student-file-debounced'
import { useGetStudentFilesQuery } from '@root/src/redux/services/manager/workspace-student'

import { useLessonManager } from '../LessonManagerContext'

// Define a default file for sandbox mode or as a fallback
const DEFAULT_FILE: StudentFile = {
  id: 'default',
  name: 'index',
  extension: 'html',
  body: '<!-- Welcome to the sandbox! -->',
  lessonId: 'sandbox',
  lessonContentId: 'sandbox',
}

interface UseFileManagerProps {
  sandbox?: boolean
}

export const useFileManager = ({ sandbox = false }: UseFileManagerProps) => {
  const { lesson, currentSlideId } = useLessonManager()
  const lessonId = lesson?.id || '',
    lessonContentId = currentSlideId
  const [file, setFile] = useState<StudentFile | null>(sandbox ? DEFAULT_FILE : null)

  const {
    data: fetchedFiles = [],
    isLoading: isFilesLoading,
    isFetching: isFilesFetching,
    error: filesError,
  } = useGetStudentFilesQuery(
    { lessonId, lessonContentId },
    { skip: !lessonId || !lessonContentId || sandbox }
  )

  const [updateStudentFile] = useUpdateStudentFileMutation()

  useEffect(() => {
    if (sandbox) {
      setFile(DEFAULT_FILE)
      return
    }

    // We only care about the first file
    if (fetchedFiles.length > 0) {
      setFile(fetchedFiles[0])
    } else {
      setFile(null)
    }
  }, [fetchedFiles, sandbox])

  const onUpdateFile = async (body: string) => {
    if (!file || sandbox) {
      if (sandbox) {
        setFile((prev) => (prev ? { ...prev, body } : null))
      }
      return
    }

    const updatedFile = { ...file, body }
    setFile(updatedFile)

    try {
      updateStudentFile({
        id: file.id,
        body,
        lessonId,
        lessonContentId,
      })
    } catch (error) {
      setFile(file)
    }
  }

  return {
    file,
    isLoading: isFilesLoading || isFilesFetching,
    error: filesError,
    onUpdateFile,
  }
}
