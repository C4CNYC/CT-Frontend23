import { useCallback } from 'react'

import { debounce } from 'lodash'

import { useDispatch } from '../../store'
import { StudentFile } from '../interfaces/workspace.interface'

import {
  extendedApiWorkspaceStudents,
  useUpdateStudentFileMutationWillDebounced,
} from './workspace-student'

export function useUpdateStudentFileMutation() {
  const dispatch = useDispatch()
  const [trigger] = useUpdateStudentFileMutationWillDebounced()

  const debouncedTrigger = useCallback(
    debounce((data: StudentFile) => {
      trigger(data) // actual mutation
    }, 10_000),
    [trigger]
  )

  const updateStudentFile = (data: Partial<StudentFile>) => {
    let lessonId = data.lessonId
    let lessonContentId = data.lessonContentId
    if (lessonId) {
      dispatch(
        extendedApiWorkspaceStudents.util.updateQueryData(
          'getStudentFiles',
          { lessonId, lessonContentId },
          (draft) => {
            const i = draft.findIndex((f) => f.id === data.id)
            if (i !== -1) {
              draft[i] = { ...draft[i], ...data }
            }
          }
        )
      )
    }

    // 2. Delayed server mutation
    debouncedTrigger(data as StudentFile)
  }

  return [updateStudentFile]
}
