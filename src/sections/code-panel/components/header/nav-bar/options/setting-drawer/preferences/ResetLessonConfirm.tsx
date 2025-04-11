import React, { useState } from 'react'

import { Box, Button, Typography } from '@mui/material'
import { useSearchParams } from 'next/navigation'

import { setCompletedSlides } from '@/redux/slices/checkers-animation'
import { useSelector } from '@/redux/store'
import { ConfirmDialog } from '@root/src/components'
import { useUpdateStudentLastVisitedSlideMutation } from '@root/src/redux/services/manager/lesson-student'
import { setSlideIndex } from '@root/src/redux/slices/code-panel-global'
import { useDispatch } from '@root/src/redux/store'
import { resetLessonEvent } from '@root/src/sections/code-panel/lib/events'
import { useTranslate } from '@root/src/utils/translateHelper'

type ResetLessonConfirmProps = {
  children?: React.ReactNode
}

function ResetLessonConfirm({ children }: ResetLessonConfirmProps) {
  const profile = useSelector((state) => state.global.user)
  const dispatch = useDispatch()
  const translate = useTranslate()
  const [openConfirm, setOpenConfirm] = useState(false)
  const [updateLastVisitedSlide] = useUpdateStudentLastVisitedSlideMutation()
  const searchParams = useSearchParams()

  const lessonId = searchParams.get('lessonId')

  const onResetLesson = () => {
    dispatch(setSlideIndex(0))
    dispatch(setCompletedSlides([]))

    if (profile) {
      updateLastVisitedSlide({ lessonId: lessonId as string, slideNumber: 0 })
    }
    if (localStorage) {
      let newProgress: any = {}
      if (lessonId) {
        newProgress[lessonId as string] = 0
      }

      localStorage.setItem(`${lessonId}_progress`, JSON.stringify(newProgress))
    }

    window.dispatchEvent(resetLessonEvent)
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
