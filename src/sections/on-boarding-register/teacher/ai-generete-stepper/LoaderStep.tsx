import { Stack, Typography } from '@mui/material'

import { LOADING_STEPS, STEP_CONTAINER_STYLES } from './constants'
import LoadingItem from './LoadingItem'

interface ILoaderStep {
  isLoading: boolean
}

const LoaderStep = ({ isLoading }: ILoaderStep) => {
  return (
    <Stack
      gap={2}
      sx={STEP_CONTAINER_STYLES}
    >
      <Typography variant='h3'>Hang tight... ⌛ 👀 💗</Typography>
      <Typography
        variant='h4'
        color='#A6A6A6'
        gutterBottom
      >
        We are building 🏗️ your lesson...
      </Typography>
      <Stack sx={{ background: '#F0EEEE80', gap: 2, py: 2, px: 3, borderRadius: '18px' }}>
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
