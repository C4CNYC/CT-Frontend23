import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Box from '@mui/system/Box'

import { ChatAiOptionsType } from './hooks/ChatConstants'

export function ChatSuggestionso({
  options,
  sendMessage,
}: {
  options?: ChatAiOptionsType[]
  sendMessage: (message: string) => void
}) {
  if (!options || options.length === 0) {
    return null
  }
  return (
    <Stack
      direction='row'
      className='message-actions'
      sx={stackStyles}
    >
      {options?.map((option, index) => (
        <a
          key={index}
          style={linkStyles}
          onClick={() => sendMessage(option.description)}
          title={option.description}
        >
          {option.shortTitle}
        </a>
      ))}
    </Stack>
  )
}

const stackStyles = {
  pt: 0.5,
}

const linkStyles = {
  fontSize: 'small',
  border: '1px solid #AAA',
  padding: '2px',
  borderRadius: '5px',
  margin: '2px 4px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#f0f0f0',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
}

export function ChatSuggestions({
  options,
  sendMessage,
}: {
  options?: ChatAiOptionsType[]
  sendMessage: (message: string) => void
}) {
  if (!options || options.length === 0) {
    return null
  }
  return (
    <Box sx={{ mb: 0.2 }}>
      <Stack
        direction='row'
        spacing={0.2}
        flexWrap='wrap'
        useFlexGap
      >
        {options?.map((option, index) => (
          <Box
            key={index}
            onClick={() => sendMessage(option.description)}
            sx={{
              py: 0.3,
              px: 0.6,
              borderRadius: 2,
              cursor: 'pointer',
              color: 'rgba(80, 180, 200, 1)',
              backgroundColor: 'rgba(1, 152, 237, 0.1)',
              border: (theme) => `1px solid ${theme.palette.grey[300]}`,
              '&:hover': {
                backgroundColor: 'rgba(1, 133, 209, 0.1)',
                color: '#01383D',
              },
              transition: 'background-color 0.2s',
            }}
          >
            <Typography
              variant='body2'
              sx={{
                fontSize: '0.7rem',
              }}
            >
              {option.shortTitle}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  )
}
