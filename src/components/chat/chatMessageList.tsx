import Box from '@mui/material/Box'

// import Lightbox, { useLightBox } from 'src/components/lightbox'

import { useMessagesScroll } from './hooks'
import ChatMessageItem from './chatMessageItem'
import { Scrollbar } from '../scrollbar'

// ----------------------------------------------------------------------

export default function ChatMessageList({ messages = [] }) {
  const { messagesEndRef } = useMessagesScroll(messages)

  //   const slides = messages
  //     .filter((message) => message.contentType === 'image')
  //     .map((message) => ({ src: message.body }))

  //   const lightbox = useLightBox(slides)

  return (
    <>
      <Scrollbar sx={{ px: 3, py: 5, height: 1 }}>
        <Box>
          {Array(6, 6, 6, 6).map((message, i) => (
            <ChatMessageItem
              key={i}
              isMe={i % 2 ? true : false}
              //   message={message}
              //   participants={participants}
              //   onOpenLightbox={() => lightbox.onOpen(message.body)}
            />
          ))}
        </Box>
      </Scrollbar>

      {/* <Lightbox
        index={lightbox.selected}
        slides={slides}
        open={lightbox.open}
        close={lightbox.onClose}
      /> */}
    </>
  )
}
