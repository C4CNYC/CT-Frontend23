import { useEffect, useMemo, useState } from 'react'

import { Card, Stack } from '@mui/material'
import Box from '@mui/material/Box'

import { useGetFriendsStudentContentQuery } from '@/redux/services/manager/friends-manager'
import { useAuthContext } from '@root/src/auth/useAuthContext'
import { useLessonManager } from '@root/src/sections/code-panel/lib/LessonManagerContext'

import { ChatHeader } from './ChatHeader'
import { IChatMessages } from './chatInterface'
import { ChatMessageInput } from './chatMessageInput'
import { ChatMessageItem } from './chatMessageItem'
import { ChatSuggestions } from './ChatSuggestions'
import { ChatAi } from './hooks/ChatAi'
import { AiAgent } from './hooks/ChatConstants'

export const CodePanelChatComponent = (): React.ReactElement => {
  const { data: friendsDB, isLoading } = useGetFriendsStudentContentQuery(
    { take: 20 },
    { skip: true }
  )

  const [selectedChat, setSelectedChat] = useState<string>('')
  const [messages, setMessages] = useState<IChatMessages[]>([])
  const chatAi = ChatAi()

  let friends = useMemo(() => {
    let friends = chatAi.userIsOwner ? [AiAgent] : []
    friendsDB?.data.forEach((friend) => {
      friends.push(friend)
    })
    return friends
  }, [chatAi.userIsOwner, friendsDB])

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

  const sendMessage = (message: string) => {
    if (selectedChat === AiAgent.id) {
      chatAi.sendMessage(setMessages)(message)
    } else {
      // @todo implement human-human chat functionality
    }
  }

  return (
    <Stack
      component={Card}
      direction='row'
      maxWidth={'sm'}
      sx={{ height: '72vh', background: 'linear-gradient(to right, #FFF5C3, #ffffcc);' }}
      className='ChatPlace'
    >
      {/* {renderNav} */}

      <Stack
        sx={{
          width: 1,
          height: 1,
          overflow: 'hidden',
        }}
      >
        {/* {renderHead} */}
        <ChatHeader />
        <Stack
          direction='row'
          sx={{
            width: 1,
            height: 1,
            overflow: 'hidden',
            borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
          }}
        >
          <Stack sx={{ width: 1, height: 1 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column-reverse',
                gap: 2,
                overflowAnchor: 'auto',
                overflowY: 'scroll',
                height: '100%',
                padding: '2px 8px',
              }}
            >
              <ChatSuggestions
                options={chatAi.chatAiOptions}
                sendMessage={sendMessage}
              />
              {messages?.map((message, i) => (
                <ChatMessageItem
                  key={i}
                  message={message}
                />
              ))}
              {!messages && (
                <Box>
                  <ChatMessageItem
                    message={{
                      id: 1,
                      chat: 'Hello, how can I help you?',
                      isMe: false,
                      ctime: new Date().getTime(),
                    }}
                  />
                </Box>
              )}
            </Box>
            <ChatMessageInput SendMessage={sendMessage} />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}

export function CodePanelChat() {
  const { user } = useAuthContext()
  const { lesson } = useLessonManager()

  if (!user || !lesson || !lesson.id || !user.id) {
    return null
  }
  return <CodePanelChatComponent />
}
