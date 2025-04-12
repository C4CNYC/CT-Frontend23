import Stack from '@mui/material/Stack'

import { ChatAiOptionsType } from './hooks/ChatConstants'

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
