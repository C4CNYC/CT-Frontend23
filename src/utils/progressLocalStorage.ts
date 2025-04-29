import { IProgressGuest } from '../redux/services/interfaces/lesson.interface'

export function progressGuestGet(lessonId: string) {
  let l = localStorage.getItem('progress_' + lessonId)
  if (!l) return 0

  let progress = JSON.parse(l) as IProgressGuest
  return progress.lastSlide
}

export function progressGuestGetAll(lessonId: string) {
  let l = localStorage.getItem('progress_' + lessonId)
  if (!l) return { lastSlide: 0, numberOfCompletedChallenges: 0, challanges: [] }

  let progress = JSON.parse(l) as IProgressGuest
  return progress
}

export function progressGuestGetAllLessons() {
  let lessons = []
  for (let i = 0; i < localStorage.length; i++)
    if (localStorage.key(i)?.startsWith('progress_'))
      lessons.push(localStorage.key(i)?.replace('progress_', ''))
  return lessons
    .filter(Boolean)
    .map((l) => ({ ...progressGuestGetAll(l || ''), lessonId: l || '' }))
}

export function progressGuestSet(lessonId: string, progress: IProgressGuest) {
  localStorage.setItem('progress_' + lessonId, JSON.stringify(progress))
}
export function progressGuestSetValidation({
  lessonId,
  courseId,
  moduleId,
  slideId,
}: {
  lessonId: string
  courseId: string
  moduleId: string
  slideId: string
}) {
  let cl = progressGuestGetAll(lessonId)
  if (!cl?.challanges) cl.challanges = []
  let found = cl.challanges.find((c) => c.slideId == slideId)
  if (!found) {
    cl.challanges.push({
      slideId,
      courseId,
      moduleId,
    })
    cl.numberOfCompletedChallenges += 1
    progressGuestSet(lessonId, cl)
  }
}
export function progressGuestClearAll() {
  for (let i = localStorage.length - 1; i > 0; i--)
    if (localStorage.key(i)?.startsWith('progress_')) localStorage.removeItem(localStorage.key(i)!)
}
