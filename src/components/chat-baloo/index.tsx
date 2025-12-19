import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react'

import { Box, Paper, Typography, TextField, Button, Chip, GlobalStyles } from '@mui/material'
import { IoChatbubbleEllipses } from '@react-icons/all-files/io5/IoChatbubbleEllipses'
import { IoClose } from '@react-icons/all-files/io5/IoClose'
import { IoPerson } from '@react-icons/all-files/io5/IoPerson'
import { IoSend } from '@react-icons/all-files/io5/IoSend'
import { IoSparkles } from '@react-icons/all-files/io5/IoSparkles'
import { formatDistanceToNowStrict } from 'date-fns'

import { Image } from '@/components'
import { useGetFriendsStudentContentQuery } from '@/redux/services/manager/friends-manager'
import { useAuthContext } from '@root/src/auth/useAuthContext'

import { IChatMessages } from '../chat/chatInterface'
import { ChatAi } from '../chat/hooks/ChatAi'
import { AiAgent } from '../chat/hooks/ChatConstants'
import { CustomAvatar } from '../custom-avatar/CustomAvatar'

import ChatSkeleton from './ChatSkeleton'
import { styles, TYPING_ANIMATION_CSS } from './styles'

export function ChatBaloo({ onClose }: any) {
  const { data: friendsDB, isLoading } = useGetFriendsStudentContentQuery(
    { take: 20 },
    { skip: true }
  )
  const { user } = useAuthContext()
  const chatAi = ChatAi()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [selectedChat, setSelectedChat] = useState<string>('')
  const [messages, setMessages] = useState<IChatMessages[]>([])
  const [isOpen, setIsOpen] = useState(true)
  const [hoveredMessage, setHoveredMessage] = useState<number | null>(null)
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const friends = useMemo(() => {
    const friendsList = chatAi.userIsOwner ? [AiAgent] : []
    friendsDB?.data.forEach((friend) => {
      friendsList.push(friend)
    })
    return friendsList
  }, [chatAi.userIsOwner, friendsDB])

  const hasRecommendations = useMemo(
    () => Boolean(chatAi?.chatAiOptions?.length),
    [chatAi?.chatAiOptions]
  )

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const handleSendMessage = useCallback(
    async (text: string = inputText) => {
      if (text.trim() === '') return

      try {
        setInputText('')

        if (selectedChat === AiAgent.id) {
          // setIsTyping(true)
          await chatAi.sendMessage(setMessages, setIsTyping)(text)
        } else {
          // TODO: implement human-human chat functionality
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error sending message:', error)
      } finally {
        // setIsTyping(false)
      }
    },
    [inputText, selectedChat, chatAi]
  )

  const handleRecommendationClick = useCallback(
    (recommendation: string) => {
      handleSendMessage(recommendation)
    },
    [handleSendMessage]
  )

  const handleMessageAction = useCallback((messageId: string | number, action: string) => {
    switch (action) {
      case 'delete':
        // TODO: Implement message deletion
        break
      case 'back':
        // TODO: Implement message regeneration/back action
        break
      case 'like':
        // TODO: Implement message like action
        break
      default:
    }
    setHoveredMessage(null)
  }, [])

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleSendMessage()
      }
    },
    [handleSendMessage]
  )

  useEffect(() => {
    if (!selectedChat && friends.length > 0) {
      setSelectedChat(friends[0].id)
    }
    if (selectedChat === AiAgent.id) {
      chatAi.chatHistoryGet().then(setMessages)
    } else {
      // @todo implement human-human chat functionality
    }
  }, [selectedChat, friends])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  const toggleMinimize = () => setIsOpen(false)
  const openChat = () => setIsOpen(true)
  const closeChat = () => onClose()

  if (!isOpen) {
    return (
      <Button
        onClick={openChat}
        sx={styles.floatingButton}
      >
        <IoChatbubbleEllipses
          size={32}
          color='white'
        />
      </Button>
    )
  }

  return (
    <>
      <GlobalStyles styles={TYPING_ANIMATION_CSS} />
      <Box sx={styles.backdrop}>
        <Paper
          elevation={24}
          sx={{
            ...styles.chatContainer,
            ...(false ? styles.chatContainerMinimized : {}),
          }}
        >
          <Box style={styles.header}>
            <Box style={styles.headerContent}>
              <Box style={styles.headerLeft}>
                <Box style={styles.botAvatar}>
                  <Image
                    alt='baloo icon'
                    src={'/assets/code-panel/bear-baloo.png'}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 35,
                      height: 35,
                    }}
                  />
                </Box>
                <Box>
                  <Typography style={styles.headerTitle}>Baloo - The Lesson Builder</Typography>
                  <Box style={styles.headerSubtitle}>
                    <IoSparkles size={12} />
                    <span>Online</span>
                  </Box>
                </Box>
              </Box>
              <Box style={styles.headerControls}>
                {/* <Button
                onClick={toggleMinimize}
                sx={styles.controlButton}
              >
                <IoRemove size={16} />
              </Button> */}
                <Button
                  onClick={closeChat}
                  sx={styles.controlButton}
                >
                  <IoClose size={16} />
                </Button>
              </Box>
            </Box>
          </Box>

          <>
            {isLoading ? (
              <ChatSkeleton />
            ) : (
              <>
                <Box sx={{ ...styles.messagesContainer }}>
                  {[...messages].reverse().map((message) => (
                    <Box
                      key={message.id}
                      style={styles.messageGroup}
                    >
                      <Box
                        sx={{
                          ...styles.messageRow,
                          ...(message.isMe ? styles.messageRowReverse : {}),
                        }}
                      >
                        <Box
                          style={{
                            ...styles.messageAvatar,
                            ...(!message.isMe ? styles.botMessageAvatar : styles.userMessageAvatar),
                          }}
                        >
                          {!message.isMe ? (
                            <Image
                              alt='baloo icon'
                              src={'/assets/code-panel/bear-baloo.png'}
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 27,
                                height: 27,
                              }}
                            />
                          ) : (
                            <>
                              {user?.avatar ? (
                                <CustomAvatar
                                  src={user?.avatar}
                                  name={user?.firstName}
                                  sx={{ width: 20, height: 20 }}
                                />
                              ) : (
                                <IoPerson
                                  size={16}
                                  color='white'
                                />
                              )}
                            </>
                          )}
                        </Box>
                        <Box
                          sx={{
                            ...styles.messageBubble,
                            ...(!message.isMe ? styles.botMessageBubble : styles.userMessageBubble),
                          }}
                          onMouseEnter={() => !message.isMe && setHoveredMessage(message.id)}
                          onMouseLeave={() => setHoveredMessage(null)}
                        >
                          <Typography style={styles.messageText}>{message.chat}</Typography>

                          {message.options && message.options.length > 0 && (
                            <Box sx={{ padding: '5px 0' }}>
                              {message.options?.map((option, index) => (
                                <a
                                  key={index}
                                  style={{
                                    fontSize: 'small',
                                    border: '1px solid #AAA',
                                    padding: '2px',
                                    borderRadius: '5px',
                                    margin: index === 0 ? '0' : '0 0 0 4px',
                                    cursor: 'pointer',
                                  }}
                                  onClick={option.onAction}
                                  title={option.description}
                                >
                                  {option.shortTitle}
                                </a>
                              ))}
                            </Box>
                          )}

                          <span style={styles.messageTimestamp}>
                            {formatDistanceToNowStrict(new Date(+message.ctime), {
                              addSuffix: true,
                            })}
                          </span>

                          {/* Hover buttons */}
                          {/* {!message.isMe && (
                          <Box
                            sx={{
                              ...styles.hoverButtons,
                              ...(hoveredMessage === message.id ? styles.hoverButtonsVisible : {}),
                            }}
                          >
                            <Button
                              onClick={() => handleMessageAction(message.id, 'back')}
                              sx={{ ...styles.hoverButton, ...styles.hoverButtonDefault }}
                              title='back'
                            >
                              <IoArrowBackCircleSharp size={20} />
                            </Button>
                            <Button
                              onClick={() => handleMessageAction(message.id, 'like')}
                              sx={{ ...styles.hoverButton, ...styles.hoverButtonDefault }}
                              title='Like'
                            >
                              <IoHappy size={20} />
                            </Button>
                            <Button
                              onClick={() => handleMessageAction(message.id, 'delete')}
                              sx={{ ...styles.hoverButton, ...styles.hoverButtonDelete }}
                              title='Delete'
                            >
                              <IoTrash size={20} />
                            </Button>
                          </Box>
                        )} */}
                        </Box>
                      </Box>
                    </Box>
                  ))}

                  {isTyping && (
                    <Box style={styles.typingIndicator}>
                      <Box style={styles.botMessageAvatar}>
                        <Image
                          alt='baloo icon'
                          src={'/assets/code-panel/bear-baloo.png'}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 27,
                            height: 27,
                          }}
                        />
                      </Box>
                      <Box style={styles.typingBubble}>
                        <Box style={styles.typingDots}>
                          <div
                            style={{ ...styles.typingDot }}
                            className='typing-dot-1'
                          ></div>
                          <div
                            style={{ ...styles.typingDot }}
                            className='typing-dot-2'
                          ></div>
                          <div
                            style={{ ...styles.typingDot }}
                            className='typing-dot-3'
                          ></div>
                        </Box>
                      </Box>
                    </Box>
                  )}
                  <div ref={messagesEndRef} />
                </Box>
              </>
            )}

            {chatAi?.chatAiOptions && chatAi.chatAiOptions.length ? (
              <Box style={styles.recommendationsSection}>
                <Box sx={styles.recommendationsContainer}>
                  {chatAi?.chatAiOptions.map((rec, index) => (
                    <Chip
                      key={index}
                      label={rec.shortTitle}
                      onClick={() => handleRecommendationClick(rec.description)}
                      sx={{
                        ...styles.recommendationChip,
                        '&:hover': {
                          background:
                            'linear-gradient(90deg, rgba(34, 211, 238, 0.3) 0%, rgba(59, 130, 246, 0.3) 100%)',
                          color: 'white',
                          borderColor: 'rgba(34, 211, 238, 0.5)',
                        },
                      }}
                    />
                  ))}
                </Box>
              </Box>
            ) : null}

            <Box style={styles.inputSection}>
              <Box style={styles.inputContainer}>
                <TextField
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder='Type a message...'
                  multiline
                  maxRows={3}
                  variant='outlined'
                  size='small'
                  sx={{
                    ...styles.textInput,
                    '& .MuiOutlinedInput-root': {
                      color: 'white',
                      maxHeight: '35px',
                      overflowY: 'auto',
                      padding: 0,
                      '& fieldset': {
                        display: 'none',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#a855f7',
                        borderWidth: '2px',
                      },
                      '& input::placeholder': {
                        color: 'rgba(255, 255, 255, 0.6)',
                        opacity: 1,
                      },
                    },
                  }}
                />
                <Button
                  onClick={() => handleSendMessage()}
                  disabled={inputText.trim() === ''}
                  sx={{
                    ...styles.sendButton,
                    '&:hover': {
                      background: 'linear-gradient(90deg, #9333ea 0%, #2563eb 100%)',
                      transform: 'scale(1.05)',
                    },
                    '&:active': {
                      transform: 'scale(0.95)',
                    },
                    '&:disabled': {
                      opacity: 0.5,
                      cursor: 'not-allowed',
                    },
                  }}
                >
                  <IoSend
                    size={16}
                    color='white'
                  />
                </Button>
              </Box>
            </Box>
          </>
        </Paper>
      </Box>
    </>
  )
}
