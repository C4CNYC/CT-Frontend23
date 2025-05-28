import React from 'react'

import { Typography, TypographyProps } from '@mui/material'

import { useTranslate } from '@root/src/utils/translateHelper'

type Props = TypographyProps & {
  translationKey: string
}

function CustomLabel({ translationKey, ...props }: Props) {
  const translate = useTranslate()
  return (
    <Typography
      variant='h3'
      {...props}
    >
      {translate(translationKey)}
    </Typography>
  )
}

export default CustomLabel
