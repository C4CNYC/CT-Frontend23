import { useMemo, useState, useCallback } from 'react'

import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import Stack from '@mui/material/Stack'
import { IoIosSend } from '@react-icons/all-files/io/IoIosSend'
import { sub } from 'date-fns'

// ----------------------------------------------------------------------

export default function ChatMessageInput(
  {
    //   recipients,
    //   selectedConversationId,
  }
) {
  const [message, setMessage] = useState('')

  const messageData = useMemo(
    () => ({
      attachments: [],
      body: message,
      contentType: 'text',
      createdAt: sub(new Date(), { minutes: 1 }),
      //   senderId: myContact.id,
    }),
    [message]
  )

  const conversationData = useMemo(
    () => ({
      messages: [messageData],
      //   participants: [recipient, myContact],
      unreadCount: 0,
    }),
    [messageData]
  )

  const handleChangeMessage = useCallback((event: any) => {
    setMessage(event?.target?.value)
  }, [])

  const handleSendMessage = useCallback(
    async (event: { key: string }) => {
      try {
        if (event.key === 'Enter') {
          if (message) {
          }
          setMessage('')
        }
      } catch (error) {
        console.error(error)
      }
    },
    [conversationData, message, messageData]
  )

  return (
    <>
      <InputBase
        value={message}
        onKeyUp={handleSendMessage}
        onChange={handleChangeMessage}
        placeholder='Type a message'
        disabled={false}
        endAdornment={
          <Stack
            direction='row'
            sx={{ flexShrink: 0 }}
          >
            <IconButton onClick={() => handleSendMessage}>
              <IoIosSend />
            </IconButton>
          </Stack>
        }
        sx={{
          px: 1,
          height: 56,
          flexShrink: 0,
          borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
        }}
      />
    </>
  )
}
