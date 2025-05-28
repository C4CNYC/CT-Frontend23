import { Button, ButtonProps } from '@mui/material'

import { useTranslate } from '@root/src/utils/translateHelper'

import { SKIP_BTN_SX } from '../constants'

type Props = ButtonProps & {
  onClick: () => void
}

function SkipBtn({ onClick, ...props }: Props) {
  const translate = useTranslate()

  return (
    <Button
      onClick={onClick}
      sx={SKIP_BTN_SX}
      {...props}
      variant='text'
    >
      {translate('skip')}
    </Button>
  )
}

export default SkipBtn
