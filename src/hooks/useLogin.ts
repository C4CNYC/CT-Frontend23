/**
 * runs after login/ logout
 */

import { useEffect } from 'react'

import { useUpdateStudentLastVisitedSlideMutation } from '../redux/services/manager/lesson-student'
import { useCompleteLessonMutation } from '../redux/services/manager/progress-student'
import { RootState, useSelector } from '../redux/store'
import { progressGuestClearAll, progressGuestGetAllLessons } from '../utils/progressLocalStorage'

export function useLogin() {
  const [updateLastVisitedSlide] = useUpdateStudentLastVisitedSlideMutation()
  const [completeLesson] = useCompleteLessonMutation()
  const userId = useSelector((state: RootState) => state.global.user?.id)

  useEffect(() => {
    if (userId) {
      runAfterLogin()
    }
  }, [userId])

  const runAfterLogin = () => {
    let lessons = progressGuestGetAllLessons()
    lessons.forEach((lesson) => {
      updateLastVisitedSlide({
        lessonId: lesson.lessonId,
        slideNumber: lesson.lastSlide,
      })
      lesson.challanges.forEach((c) => {
        if (!c?.processed) {
          completeLesson({
            lesson_content_id: c.slideId,
            id: c.courseId,
            module_id: c.moduleId,
            code: '',
          })
          c.processed = true
        }
      })
    })
    progressGuestClearAll()
  }
}
