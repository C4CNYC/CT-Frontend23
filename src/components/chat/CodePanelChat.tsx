import { useEffect, useMemo, useState } from 'react'

import { Card, Stack } from '@mui/material'
import Box from '@mui/material/Box'

import { useGetFriendsStudentContentQuery } from '@/redux/services/manager/friends-manager'

import { ChatHeader } from './ChatHeader'
import { IChatMessages } from './chatInterface'
import { ChatMessageInput } from './chatMessageInput'
import { ChatMessageItem } from './chatMessageItem'
import { ChatSuggestions } from './ChatSuggestions'
import { ChatAi } from './hooks/ChatAi'
import { AiAgent } from './hooks/ChatConstants'

export const CodePanelChat = (): React.ReactElement => {
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
      sx={{ height: '72vh', background: 'linear-gradient(to right, #fff7e6, #ffffcc);' }}
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

/*

import ChatHeaderDetail from './chatHeaderDetail'
import { ChatNav } from './chatNav'



  const selectedFriend = useMemo(
    () => friends.find((friend) => friend.id === selectedChat),
    [friendsDB, selectedChat]
  )
  const handleSelectChat = (id: string): void => {
    setSelectedChat(id)
  }
  

  const renderNav = (
    <ChatNav
      selectChat={handleSelectChat}
      selectedConversation={selectedChat}
      isLoading={isLoading}
      friends={friends}
    />
  )

  const renderHead = (
    <Stack
      direction='row'
      alignItems='center'
      flexShrink={0}
      sx={{ pr: 1, pl: 2.5, py: 1, minHeight: 72 }}
    >
      <ChatHeaderDetail
        name={selectedFriend?.first_name}
        avatar={selectedFriend?.avatar}
        status={selectedFriend?.active}
      />
    </Stack>
  )*/
