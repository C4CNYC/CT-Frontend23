import { useMemo, useState } from 'react'

import { Card, Stack } from '@mui/material'

import { useGetFriendsStudentContentQuery } from '@/redux/services/manager/friends-manager'

import ChatHeaderDetail from './chatHeaderDetail'
import ChatMessageInput from './chatMessageInput'
import ChatMessageList from './chatMessageList'
import ChatNav from './chatNav'

const Chat = (): React.ReactElement => {
  const { data, isLoading } = useGetFriendsStudentContentQuery({ take: 20 })
  const [selectedChat, setSelectedChat] = useState<string>('')

  const handleSelectChat = (id: string): void => {
    setSelectedChat(id)
  }

  const selectedFriend = useMemo(
    () => data?.data.find((friend) => friend.id === selectedChat),
    [data, selectedChat]
  )

  const renderNav = (
    <ChatNav
      selectChat={handleSelectChat}
      selectedConversation={selectedChat}
      isLoading={isLoading}
      friends={data?.data}
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
        overflow: 'hidden',
      }}
    >
      <ChatMessageList />

      <ChatMessageInput
      // recipients={recipients}
      // selectedConversation={selectedChat}
      />
    </Stack>
  )

  return (
    <Stack
      component={Card}
      direction='row'
      maxWidth={'xl'}
      sx={{ height: '72vh', backgroundColor: '#f0f0f0' }}
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
export const CodePanelChat = Chat
export default Chat
