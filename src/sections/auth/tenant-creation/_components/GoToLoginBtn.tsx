import LoadingButton from '@mui/lab/LoadingButton'
import { ButtonProps, Link } from '@mui/material'

import { useTranslate } from '@root/src/utils/translateHelper'

import { SUBMIT_BTN_SX } from '../constants'

type Props = ButtonProps & {
  link: string
  loading?: boolean
}

function GoToLoginBtn({ link, ...props }: Props) {
  const translate = useTranslate()

  return (
    <LoadingButton
      sx={SUBMIT_BTN_SX}
      {...props}
    >
      <Link
        sx={{
          color: 'inherit',
          textDecoration: 'none',
          width: '100%',
          height: '100%',
          display: 'block',
          '&:hover': {
            textDecoration: 'none',
          },
        }}
        href={link}
        target='_blank'
        rel='noopener noreferrer'
      >
        Go to Login
      </Link>
    </LoadingButton>
  )
}

export default GoToLoginBtn
