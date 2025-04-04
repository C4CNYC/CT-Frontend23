import { useEffect, useMemo, useState } from 'react'

import { Card, Stack } from '@mui/material'
import Box from '@mui/material/Box'

import { useGetFriendsStudentContentQuery } from '@/redux/services/manager/friends-manager'

import { Scrollbar } from '../scrollbar/Scrollbar'

import ChatHeaderDetail from './chatHeaderDetail'
import { IChatMessages } from './chatInterface'
import { ChatMessageInput } from './chatMessageInput'
import { ChatMessageItem } from './chatMessageItem'
import { ChatNav } from './chatNav'
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

  useEffect(() => {
    if (selectedChat === AiAgent.id) {
      chatAi.getChatHistory().then(setMessages)
    } else {
      // @todo implement human-human chat functionality
    }
  }, [selectedChat])
  let friends = chatAi.userIsOwner ? [AiAgent] : []
  friendsDB?.data.forEach((friend) => {
    friends.push(friend)
  })

  const handleSelectChat = (id: string): void => {
    setSelectedChat(id)
  }

  const selectedFriend = useMemo(
    () => friends.find((friend) => friend.id === selectedChat),
    [friendsDB, selectedChat]
  )
  const sendMessage = (message: string) => {
    if (selectedChat === AiAgent.id) {
      chatAi.sendMessage(setMessages)(message)
    } else {
      // @todo implement human-human chat functionality
    }
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
  )

  const renderMessages = (
    <Stack
      sx={{
        width: 1,
        height: 1,
      }}
    >
      <Scrollbar sx={{ px: 3, py: 5, height: 1 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column-reverse', gap: 2 }}>
          {messages.map((message, i) => (
            <ChatMessageItem
              key={i}
              message={message}
              //   participants={participants}
            />
          ))}
        </Box>
      </Scrollbar>

      <ChatMessageInput SendMessage={sendMessage} />
    </Stack>
  )

  return (
    <Stack
      component={Card}
      direction='row'
      maxWidth={'xl'}
      sx={{ height: '72vh', backgroundColor: '#f0f0f0' }}
      className='ChatPlace'
    >
      {renderNav}

      <Stack
        sx={{
          width: 1,
          height: 1,
          overflow: 'hidden',
        }}
      >
        {renderHead}

        <Stack
          direction='row'
          sx={{
            width: 1,
            height: 1,
            overflow: 'hidden',
            borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
          }}
        >
          {renderMessages}
        </Stack>
      </Stack>
    </Stack>
  )
}
