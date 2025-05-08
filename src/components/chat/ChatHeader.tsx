import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

export const ChatHeader = () => (
  <Stack
    direction='row'
    alignItems='center'
    justifyContent='space-between'
    sx={{
      px: 1,
      py: 0.3,
      backGround:
        'linear-gradient(90deg,rgba(180, 58, 58, 0.64) 0%, rgba(29, 66, 253, 0.55) 50%, rgba(252, 197, 69, 0.58) 100%)',
    }}
  >
    <Stack
      direction='row'
      alignItems='center'
      spacing={1}
    >
      <Typography
        variant='subtitle1'
        fontWeight='600'
        color='#a56953'
      >
        <span
          style={{
            transform: 'scale(1.5)',
            display: 'inline-block',
            fontSize: '1.5em',
            letterSpacing: '.2em',
          }}
        >
          {' '}
          🐻{' '}
        </span>{' '}
        Baloo - The Lesson Builder
      </Typography>
    </Stack>
  </Stack>
)
