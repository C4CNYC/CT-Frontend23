import React from 'react'

import { Stack } from '@mui/material'

import { RHFTextField } from '@root/src/components'

import CustomLabel from './_components/CustomLabel'
import NextBtn from './_components/NextBtn'
import SkipBtn from './_components/SkipBtn'
import { styledRegisterInput } from './constants'
import { useStepperContext } from './stepper-context'

const NoteStep = () => {
  const { handleUpdateInfo, isLoading } = useStepperContext()

  return (
    <Stack sx={{ gap: 3 }}>
      <CustomLabel translationKey='Anything we should know?' />

      <RHFTextField
        multiline
        rows={3}
        placeholder='Anything that is a priority for you or a deal-breaker?'
        name='note'
        sx={(theme) => ({
          ...styledRegisterInput(theme, {
            '& .MuiInputBase-root': {
              height: 'auto',
              background: theme.palette.mode === 'light' ? '#efefef' : 'initial',
            },
          }),
        })}
      />

      <NextBtn
        onClick={handleUpdateInfo}
        loading={isLoading}
      />
      <SkipBtn onClick={handleUpdateInfo} />
    </Stack>
  )
}

export default NoteStep
