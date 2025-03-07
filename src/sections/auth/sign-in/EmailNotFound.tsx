import { Dispatch, SetStateAction } from 'react'

import { Button, IconButton, Stack, Typography } from '@mui/material'
import { MdArrowBackIosNew } from '@react-icons/all-files/md/MdArrowBackIosNew'
import { StepWizardChildProps } from 'react-step-wizard'

import { useTranslate } from '@/utils/translateHelper'
import { Image } from '@root/src/components'

import { SINGIN_BTN_SX } from './constants'

interface Props {
  setError: Dispatch<SetStateAction<string>>
}

export default function EmailNotFound({
  previousStep,
  setError,
}: Partial<StepWizardChildProps> & Props): React.ReactElement {
  const translate = useTranslate()

  return (
    <>
      <IconButton
        onClick={() => {
          setError('')
          previousStep?.()
        }}
        sx={{ ml: '-30px', mt: '-30px' }}
      >
        <MdArrowBackIosNew />
      </IconButton>

      <Typography variant='h4'>{translate('login_email_not_found')}</Typography>
      <Typography
        variant='h4'
        gutterBottom
      >
        {translate('login_or_wrong_password')}
      </Typography>
      <Typography variant='body1'>{translate('login_try_again')}</Typography>
      <Image
        sx={{ width: '130px', height: '130px', m: '5px auto' }}
        alt='error'
        src='/assets/on-boarding/notFound.svg'
      />
      <Stack sx={{ mt: 2 }}>
        <Button
          onClick={() => {
            setError('')
            previousStep?.()
          }}
          sx={SINGIN_BTN_SX}
        >
          {translate('login_go_back')}
        </Button>
      </Stack>
    </>
  )
}
