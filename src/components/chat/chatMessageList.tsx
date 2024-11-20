import Box from '@mui/material/Box'

import { IChatMessage } from '@/redux/slices/chat-handler'

import { Scrollbar } from '../scrollbar'

import ChatMessageItem from './chatMessageItem'

// ----------------------------------------------------------------------

export default function ChatMessageList({ messages = [] }: { messages: Array<IChatMessage> }) {
  return (
    <>
      <Scrollbar sx={{ px: 3, py: 5, height: 1 }}>
        <Box>
          {messages.map((message, i) => {
            return <ChatMessageItem
              key={i}
              message={message}
              //   participants={participants}
            />
          }
          )}
        </Box>
      </Scrollbar>
    </>
  )
}
