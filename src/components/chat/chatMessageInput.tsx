import { useMemo, useState, useCallback } from 'react'

import { useTheme } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import Stack from '@mui/material/Stack'
import Box from '@mui/system/Box'
import { IoIosSend } from '@react-icons/all-files/io/IoIosSend'
import { sub } from 'date-fns'

export function ChatMessageInputOld({ SendMessage }: { SendMessage: (messageData: any) => void }) {
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
            SendMessage(message)
          }
          setMessage('')
        }
      } catch (error) {
        // console.error(error)
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
        }}
      />
    </>
  )
}

export const ChatMessageInput = ({ SendMessage }: { SendMessage: (messageData: any) => void }) => {
  const theme = useTheme()
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (input.trim()) {
      SendMessage(input)
      setInput('')
    }
  }

  const handleKeyPress = (e: { key: string; shiftKey: any; preventDefault: () => void }) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <Box
      sx={{
        borderTop: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Stack
        direction='row'
        spacing={1}
        alignItems='flex-end'
      >
        <Box
          component='input' // it was textarea 25.05.07
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder='Type a message...'
          sx={{
            width: '100%',
            border: 'none',
            outline: 'none',
            resize: 'none',
            p: 1.5,
            borderRadius: 2,
            backgroundColor: theme.palette.grey[100],
            fontFamily: 'inherit',
            fontSize: '0.875rem',
            maxHeight: '120px',
          }}
        />

        {input ? (
          <IconButton
            sx={{ background: '#f0f0f0', color: '#666', height: 40, width: 40 }}
            onClick={handleSend}
          >
            <IoIosSend />
          </IconButton>
        ) : null}
      </Stack>
    </Box>
  )
}
