import React, { useState } from 'react'

import { Box, Button, Typography } from '@mui/material'
import { useSearchParams } from 'next/navigation'

import { useSelector } from '@/redux/store'
import { ConfirmDialog } from '@root/src/components'
import { useUpdateStudentLastVisitedSlideMutation } from '@root/src/redux/services/manager/lesson-student'
import { useResetContentChalangesMutation } from '@root/src/redux/services/manager/progress-student'
import { useResetStudentFiles } from '@root/src/redux/services/manager/workspace-student'
import { setSlideId, setSlideIndex } from '@root/src/redux/slices/code-panel-global'
import { useDispatch } from '@root/src/redux/store'
import { resetLessonEvent } from '@root/src/sections/code-panel/lib/events'
import { useLessonManager } from '@root/src/sections/code-panel/lib/LessonManagerContext'
import { progressGuestSet } from '@root/src/utils/progressLocalStorage'
import { useTranslate } from '@root/src/utils/translateHelper'

type ResetLessonConfirmProps = {
  children?: React.ReactNode
}

function ResetLessonConfirm({ children }: ResetLessonConfirmProps) {
  const { lessonContent } = useLessonManager()
  const profile = useSelector((state) => state.global.user)
  const dispatch = useDispatch()
  const translate = useTranslate()
  const [openConfirm, setOpenConfirm] = useState(false)
  const slideId = useSelector((state) => state.codePanelGlobal.slideId)

  const [updateLastVisitedSlide] = useUpdateStudentLastVisitedSlideMutation()
  const [resetContentChalanges] = useResetContentChalangesMutation()
  const searchParams = useSearchParams()

  const lessonId = searchParams.get('lessonId')
  const deleteAllFiles = useResetStudentFiles({
    lessonId: lessonId as string,
    lessonContentId: slideId as string,
  })

  const onResetLesson = async () => {
    await resetContentChalanges({ lesson_id: lessonId as string })

    if (profile) {
      updateLastVisitedSlide({ lessonId: lessonId as string, slideNumber: 0 })
      deleteAllFiles()
    }
    if (localStorage) {
      progressGuestSet(lessonId as string, {
        lastSlide: 0,
        numberOfCompletedChallenges: 0,
        challanges: [],
      })
    }

    window.dispatchEvent(resetLessonEvent)
    dispatch(setSlideIndex(0))
    if (!lessonContent?.length) return
    let slideId = lessonContent[0]?.id
    if (slideId) dispatch(setSlideId(slideId))
  }

  const handleOpenConfirm = () => {
    setOpenConfirm(true)
  }

  const handleCloseConfirm = () => {
    setOpenConfirm(false)
  }
  return (
    <>
      <Box onClick={handleOpenConfirm}>{children}</Box>
      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title={translate('reset_lesson')}
        actionsProps={{ flexDirection: 'row-reverse', justifyContent: 'flex-start', gap: 2 }}
        content={<Typography>{translate('reset_lesson_confirm')}</Typography>}
        action={
          <Button
            sx={{ alignSelf: 'flex-end' }}
            variant='contained'
            color='warning'
            onClick={() => {
              onResetLesson()
              handleCloseConfirm()
            }}
          >
            {translate('reset_lesson_submit_btn')}
          </Button>
        }
      />
    </>
  )
}

export default ResetLessonConfirm
