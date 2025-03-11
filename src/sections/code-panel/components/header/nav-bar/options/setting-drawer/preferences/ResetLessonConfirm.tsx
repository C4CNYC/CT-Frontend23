import React, { useState } from 'react'

import { Box, Button, Typography } from '@mui/material'

import { ConfirmDialog } from '@root/src/components/confirm-dialog/ConfirmDialog'
import { setSlideIndex } from '@root/src/redux/slices/code-panel-global'
import { useDispatch } from '@root/src/redux/store'
import { resetLessonEvent } from '@root/src/sections/code-panel/lib/events'
import { useTranslate } from '@root/src/utils/translateHelper'

type ResetLessonConfirmProps = {
  children?: React.ReactNode
}

function ResetLessonConfirm({ children }: ResetLessonConfirmProps) {
  const dispatch = useDispatch()
  const translate = useTranslate()
  const [openConfirm, setOpenConfirm] = useState(false)

  const onResetLesson = () => {
    dispatch(setSlideIndex(0))
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
