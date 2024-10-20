import { Stack, Typography, useTheme } from '@mui/material'

import { useTranslate } from '@root/src/utils/translateHelper'

import { LOADING_STEPS } from './constants'
import LoadingItem from './LoadingItem'

interface ILoaderStep {
  isLoading: boolean
}

const LoaderStep = ({ isLoading }: ILoaderStep) => {
  const theme = useTheme()
  const translate = useTranslate()
  return (
    <Stack
      gap={2}
      minHeight='770px'
      width={{ xs: '300px', sm: '400px', md: '560px' }}
    >
      <Typography variant='h3'> {translate('ai_gen_loading_title')}</Typography>
      <Typography
        variant='h4'
        color='#A6A6A6'
        gutterBottom
      >
        {translate('ai_gen_loading_subtitle')}
      </Typography>
      <Stack
        sx={{
          background:
            theme.palette.mode === 'dark' ? theme.palette.background.neutral : '#F0EEEE80',
          gap: 2,
          py: 2,
          px: 3,
          borderRadius: '18px',
        }}
      >
        {LOADING_STEPS.map((el, index) => (
          <LoadingItem
            key={index}
            text={el}
            isLoading={index !== LOADING_STEPS.length - 1 ? undefined : isLoading}
            multiply={index + 1}
          />
        ))}
      </Stack>
    </Stack>
  )
}

export default LoaderStep
