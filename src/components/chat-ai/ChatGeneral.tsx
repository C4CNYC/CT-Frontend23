import React, { useState, useRef, useEffect } from 'react'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import SendIcon from '@mui/icons-material/Send'
import StopIcon from '@mui/icons-material/Stop'
import {
  Box,
  Container,
  Paper,
  TextField,
  IconButton,
  Typography,
  Avatar,
  Stack,
  Fab,
  useTheme,
  Button,
} from '@mui/material'

import { IChatMessages } from '../chat/chatInterface'

// Demo purposes - message data
const initialMessages: IChatMessages[] = [
  { id: 1, isMe: false, chat: 'Hello! How can I help you today?', ctime: Date.now() - 3600000 },
  { id: 2, isMe: true, chat: 'Can you tell me about React?', ctime: Date.now() - 1800000 },
]

export const ChatGeneral: React.FC = () => {
  const [messages, setMessages] = useState<IChatMessages[]>(initialMessages)
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  const chatContainerRef = useRef<HTMLDivElement | null>(null)
  const theme = useTheme()

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      // Using standard DOM methods instead of scrollIntoView
      const container = chatContainerRef.current
      if (container) {
        container.scrollTop = container.scrollHeight
      }
    }
  }

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  // Handle message submission
  const handleSubmitMessage = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!input.trim()) return

    // Add user message
    const newMessage: IChatMessages = {
      id: messages.length + 1,
      isMe: true,
      chat: input,
      ctime: Date.now(),
    }
    setMessages([...messages, newMessage])
    setInput('')
    setIsLoading(true)

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse: IChatMessages = {
        id: messages.length + 2,
        isMe: false,
        chat: `This is a simulated response to: "${input}"`,
        ctime: Date.now(),
        options: [
          {
            type: 'suggestion',
            action: 'ask_more',
            shortTitle: 'Tell me more',
            description: 'Get additional information about this topic',
          },
          {
            type: 'action',
            action: 'summarize',
            shortTitle: 'Summarize',
            description: 'Get a summary of this information',
          },
        ],
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
    }, 1500)
  }

  // Handle stop generation
  const stop = () => {
    setIsLoading(false)
  }

  // Check if user has scrolled up
  const [isScrolledUp, setIsScrolledUp] = useState(false)

  const handleScroll = () => {
    if (!chatContainerRef.current) return

    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current
    const isBottom = scrollHeight - scrollTop - clientHeight < 20
    setIsScrolledUp(!isBottom)
  }

  // Format timestamp
  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        bgcolor: theme.palette.mode === 'dark' ? 'background.paper' : 'grey.100',
      }}
    >
      <Box
        ref={chatContainerRef}
        onScroll={handleScroll}
        sx={{
          flexGrow: 1,
          overflow: 'auto',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Stack
          spacing={2}
          sx={{ maxWidth: '800px', width: '100%', mx: 'auto', pb: 2 }}
        >
          {messages.map((message) => (
            <Box
              key={message.id}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: message.isMe ? 'flex-end' : 'flex-start',
                mb: 2,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: message.isMe ? 'flex-end' : 'flex-start',
                  width: '100%',
                }}
              >
                {!message.isMe && (
                  <Avatar
                    sx={{
                      bgcolor: 'primary.main',
                      mr: 1,
                      alignSelf: 'flex-start',
                    }}
                  >
                    AI
                  </Avatar>
                )}

                <Paper
                  elevation={1}
                  sx={{
                    p: 2,
                    maxWidth: '70%',
                    borderRadius: 2,
                    backgroundColor: message.isMe
                      ? 'primary.main'
                      : theme.palette.mode === 'dark'
                        ? 'grey.800'
                        : 'grey.50',
                    color: message.isMe ? 'white' : 'text.primary',
                  }}
                >
                  <Typography variant='body1'>{message.chat}</Typography>
                  <Typography
                    variant='caption'
                    sx={{
                      display: 'block',
                      textAlign: 'right',
                      mt: 0.5,
                      color: message.isMe ? 'rgba(255,255,255,0.7)' : 'text.secondary',
                    }}
                  >
                    {formatTime(message.ctime)}
                  </Typography>
                </Paper>
              </Box>

              {/* Options/Actions for AI messages */}
              {!message.isMe && message.options && message.options.length > 0 && (
                <Box sx={{ mt: 1, ml: 5, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {message.options.map((option, idx) => (
                    <Button
                      key={idx}
                      size='small'
                      variant={option.type === 'action' ? 'contained' : 'outlined'}
                      onClick={() => option.onAction && option.onAction()}
                      sx={{ borderRadius: 4, textTransform: 'none' }}
                    >
                      {option.shortTitle}
                    </Button>
                  ))}
                </Box>
              )}
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Stack>
      </Box>

      {isScrolledUp && (
        <Box sx={{ position: 'absolute', bottom: 90, left: '50%', transform: 'translateX(-50%)' }}>
          <Fab
            size='small'
            color='primary'
            onClick={scrollToBottom}
            aria-label='scroll to bottom'
          >
            <KeyboardArrowDownIcon />
          </Fab>
        </Box>
      )}

      <Container
        maxWidth='md'
        sx={{ py: 2 }}
      >
        <Paper
          component='form'
          onSubmit={handleSubmitMessage}
          elevation={3}
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            borderRadius: 4,
          }}
        >
          <TextField
            fullWidth
            multiline
            maxRows={4}
            value={input}
            onChange={handleInputChange}
            placeholder='Type a message...'
            variant='standard'
            InputProps={{
              disableUnderline: true,
            }}
            sx={{ ml: 1, flex: 1 }}
          />

          {isLoading ? (
            <IconButton
              color='primary'
              onClick={stop}
            >
              <StopIcon />
            </IconButton>
          ) : (
            <IconButton
              color='primary'
              sx={{ p: '10px' }}
              disabled={!input.trim()}
              onClick={() => handleSubmitMessage()}
            >
              <SendIcon />
            </IconButton>
          )}
        </Paper>
      </Container>
    </Box>
  )
}
