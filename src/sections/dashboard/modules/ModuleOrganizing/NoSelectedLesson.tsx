import { useTranslate } from '@/utils/translateHelper'
import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import { NO_SELECTED_BOX_SX } from './constants'

export const NoSelectedLesson = (): React.ReactElement => {
  const translate = useTranslate()

  return (
    <Box sx={NO_SELECTED_BOX_SX}>
      <Typography variant='h3'>{translate('modules_pls_select_lesson')}</Typography>
      <Box pl='50px'>
        <Image
          src='/assets/illustrations/illustration_docs.svg'
          alt='docs'
          width='400'
          height='400'
        />
      </Box>
    </Box>
  )
}
