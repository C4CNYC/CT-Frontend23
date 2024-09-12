import { useState } from 'react'

import { Button, Stack, Typography } from '@mui/material'

import { Iconify } from '@/components/iconify'
import { useTranslate } from '@/utils/translateHelper'
import { ConfirmDialog } from '@root/src/components'

import BasePreference from './BasePreference'

interface IResetCode {
  onReset: () => void
}

const ResetCode = ({ onReset }: IResetCode): React.ReactElement => {
  const translate = useTranslate()
  const [openConfirm, setOpenConfirm] = useState(false)

  const handleOpenConfirm = () => {
    setOpenConfirm(true)
  }

  const handleCloseConfirm = () => {
    setOpenConfirm(false)
  }
  return (
    <>
      <BasePreference title={translate('reset_lesson')}>
        <Button
          onClick={handleOpenConfirm}
          fullWidth
          variant='contained'
        >
          <Iconify
            mr='7px'
            icon='carbon:reset'
          />
          {translate('reset_code')}
        </Button>
      </BasePreference>
      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title={'Reset Lesson'}
        actionsProps={{ flexDirection: 'row-reverse', justifyContent: 'flex-start', gap: 2 }}
        content={
          <Stack
            gap={2}
            pr={2}
          >
            <Typography>
              If you reset this lesson it will load the default “Starter Code” for this lesson. It
              will also delete your progress.
            </Typography>
            <Typography>
              If you wish to use any custom code you wrote in a previous lesson, you can copy and
              paste it from there.
            </Typography>
          </Stack>
        }
        action={
          <Button
            sx={{ alignSelf: 'flex-end' }}
            variant='contained'
            color='warning'
            onClick={() => {
              onReset()
              handleCloseConfirm()
            }}
          >
            Reset Lesson
          </Button>
        }
      />
    </>
  )
}

export default ResetCode
