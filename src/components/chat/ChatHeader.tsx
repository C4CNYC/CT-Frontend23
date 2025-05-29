import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

export const ChatHeader = () => (
  <Stack
    className='chat-header'
    direction='row'
    alignItems='center'
    justifyContent='space-between'
    sx={{
      px: 1,
      py: 0.3,
      background: 'linear-gradient(90deg,#F9FAFB 0%, #FAFBF9 50%, #FAF9FB 100%)',
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
