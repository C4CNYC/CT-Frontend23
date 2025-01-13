import { Link } from '@mui/material'
import NextLink from 'next/link'

import { ILesson } from '@/redux/interfaces/content.interface'
import { STUDENT_PATH_DASHBOARD } from '@root/src/routes/student.paths'
import { useTranslate } from '@root/src/utils/translateHelper'

import CatalogLessonDialog from './CatalogLessonDialog'
import LessonDialog from './LessonDialog'
import LessonStartButton from './LessonStartButton'
import LockedStartButton from './LockedStartButton'

type Props = {
  locked: boolean
  isLastLessonInProgress: boolean
  fetchCodeFromPrevLesson: () => void
  fetchDefaultCodeFromPrevLesson: () => void
  courseId: string | string[] | undefined
  unitId: string | undefined
  lesson: ILesson
  index: number | undefined
}

export function LessonItemButton({
  locked,
  isLastLessonInProgress,
  fetchCodeFromPrevLesson,
  fetchDefaultCodeFromPrevLesson,
  courseId,
  unitId,
  lesson,
  index,
}: Props) {
  const translate = useTranslate()
  let lessonNoProgress = !lesson.progress && isLastLessonInProgress

  if (!locked) {
    return index !== 0 && lessonNoProgress ? (
      <CatalogLessonDialog
        confirmText={translate('actions_ok')}
        confirmClick={fetchCodeFromPrevLesson}
        title={translate('lesson_catalog_dialog_title')}
      >
        <LockedStartButton />
      </CatalogLessonDialog>
    ) : (
      <LessonStartButton
        customHref={STUDENT_PATH_DASHBOARD.codePanel.workSpace({
          courseId: courseId as string,
          unitId,
          lessonId: lesson.id,
        })}
      />
    )
  }

  return lessonNoProgress ? (
    !lesson.independent ? (
      <LessonDialog onOpenLesson={fetchDefaultCodeFromPrevLesson}>
        <LockedStartButton />
      </LessonDialog>
    ) : (
      <Link
        href={STUDENT_PATH_DASHBOARD.codePanel.workSpace({
          courseId: courseId as string,
          unitId,
          lessonId: lesson.id,
        })}
        component={NextLink}
        sx={{ '&:hover': { textDecoration: 'none' } }}
      >
        <LockedStartButton />
      </Link>
    )
  ) : (
    <LessonStartButton
      customHref={STUDENT_PATH_DASHBOARD.codePanel.workSpace({
        courseId: courseId as string,
        unitId,
        lessonId: lesson.id,
      })}
    />
  )
}
