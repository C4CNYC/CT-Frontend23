import { Button, ButtonProps } from '@mui/material'

import { useTranslate } from '@root/src/utils/translateHelper'

import { SUBMIT_BTN_SX } from '../constants'

type Props = ButtonProps & {
  onClick: () => void
}

function NextBtn({ onClick, ...props }: Props) {
  const translate = useTranslate()

  return (
    <Button
      onClick={onClick}
      sx={SUBMIT_BTN_SX}
      {...props}
    >
      {translate('next')}
    </Button>
  )
}

export default NextBtn
