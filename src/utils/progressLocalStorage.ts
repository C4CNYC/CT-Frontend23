import { IProgressGuest } from '../redux/services/interfaces/lesson.interface'

export function progressGuestGet(lessonId: string) {
  let l = localStorage.getItem('progress_' + lessonId)
  if (!l) return 0

  let progress = JSON.parse(l) as IProgressGuest
  return progress.lastSlide
}

export function progressGuestGetAll(lessonId: string) {
  let l = localStorage.getItem('progress_' + lessonId)
  if (!l) return { lastSlide: 0, numberOfCompletedChallenges: 0 }

  let progress = JSON.parse(l) as IProgressGuest
  return progress
}

export function progressGuestSet(lessonId: string, progress: IProgressGuest) {
  localStorage.setItem('progress_' + lessonId, JSON.stringify(progress))
}
