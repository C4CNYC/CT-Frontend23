import { useState } from 'react'

import { LoadingButton } from '@mui/lab'
import { Card, Stack } from '@mui/material'
import { RHFTextField, useSnackbar } from '@/components'
import { useStudentResetPasswordMutation } from '@/redux/services/manager/students-manager'
import { useTranslate } from '@/utils/translateHelper'
import { createWeakPassword } from '@root/src/auth/utils'

import { IStudent } from '@root/src/redux/services/interfaces/user.interface'
import { BaseResponseInterface } from '@root/src/utils/baseResponse.interface'

export function StudentChangePassword({
  currentUser,
}: {
  currentUser: IStudent & BaseResponseInterface
}) {
  const translate = useTranslate()
  const { enqueueSnackbar } = useSnackbar()

  const [password, passwordSet] = useState(createWeakPassword())
  const [resetPassword, { isLoading: isResettingPassword }] = useStudentResetPasswordMutation()
  const [resetPasswordUpdated, resetPasswordUpdatedSet] = useState('')

  const handleResetPassword = async (): Promise<void> => {
    if (currentUser && currentUser?.id) {
      try {
        await resetPassword({
          studentId: currentUser?.id,
          schoolId: '12',
          password,
        }).unwrap()
        resetPasswordUpdatedSet(translate('member_password_updated', { password }))
      } catch (e: any) {
        enqueueSnackbar(e.data.message, {
          variant: 'error',
        })
        resetPasswordUpdatedSet(e.data.message)
      }
    }
  }

  if (currentUser?.account?.id == undefined) return <></>

  return (
      <Card>
        <Stack
          alignItems='flex-end'
          sx={{ mt: 3 }}
        >
          <RHFTextField
            sx={{ mb: 3 }}
            name='password'
            label={translate('generated_passowrd')}
            value={password}
            onChange={e => passwordSet(e.currentTarget.value)}
          />
          {resetPasswordUpdated}
          <LoadingButton
            loading={isResettingPassword}
            onClick={handleResetPassword}
            variant='contained'>
              {translate('actions_password')}
          </LoadingButton>
        </Stack>
      </Card>)
}
