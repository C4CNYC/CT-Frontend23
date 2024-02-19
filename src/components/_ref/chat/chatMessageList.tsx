import Box from '@mui/material/Box'

import ChatMessageItem from './chatMessageItem'
import { Scrollbar } from '../../scrollbar'

// ----------------------------------------------------------------------

export default function ChatMessageList({ messages = [] }) {
  return (
    <>
      <Scrollbar sx={{ px: 3, py: 5, height: 1 }}>
        <Box>
          {Array(6, 6, 6, 6).map((_, i) => (
            <ChatMessageItem
              key={i}
              isMe={i % 2 ? true : false}
              //   message={message}
              //   participants={participants}
            />
          ))}
        </Box>
      </Scrollbar>
    </>
  )
}
