import { IProgressGuest } from '../redux/services/interfaces/lesson.interface'

export function progressGuestSet(lessonId: string, progress: IProgressGuest) {
  localStorage.setItem('progress_' + lessonId, JSON.stringify(progress))
}
