import LoadingButton from '@mui/lab/LoadingButton'
import { ButtonProps } from '@mui/material'

import { useTranslate } from '@root/src/utils/translateHelper'

import { SUBMIT_BTN_SX } from '../constants'

type Props = ButtonProps & {
  onClick: () => void
  loading?: boolean
}

function NextBtn({ onClick, ...props }: Props) {
  const translate = useTranslate()

  return (
    <LoadingButton
      onClick={onClick}
      sx={SUBMIT_BTN_SX}
      {...props}
    >
      {translate('next')}
    </LoadingButton>
  )
}

export default NextBtn
