import { useMemo, useState } from 'react'

import { Stack } from '@mui/material'
import { useDispatch } from 'react-redux'

import { useGetFriendsStudentContentQuery } from '@/redux/services/manager/friends-manager'
import { useGetHelpFromAIMutation } from '@/redux/services/manager/lessons-manager'
import { setChatMessages, IChatMessage } from '@/redux/slices/chat-handler'
import { useSelector } from '@/redux/store'

import ChatHeaderDetail from './chatHeaderDetail'
import ChatMessageInput from './chatMessageInput'
import ChatMessageList from './chatMessageList'
import ChatNav from './chatNav'

enum SENDER_AI {
  MUMU_AI = 'Mumu AI',
}

const Chat = (): React.ReactElement => {
  const { data, isLoading } = useGetFriendsStudentContentQuery({ take: 20 })
  const [selectedChat, setSelectedChat] = useState<string>('')
  const messageLog = useSelector((state) => state.chatHandler.chatMessages)
  const slideContext = useSelector((state) => state.chatHandler.slideContext)
  const profile = useSelector((state) => state.global.user)
  // const code = useSelector((state) => state.codePanelGlobal.code)
  const solutionCode = useSelector((state) => state.codePanelGlobal.solutionCode)
  const dispatch = useDispatch()
  const [getHelpFromAI, { isLoading: getHelpFromAILoading }] = useGetHelpFromAIMutation()

  const handleSelectChat = (id: string): void => {
    setSelectedChat(id)
  }

  const selectedFriend = useMemo(
    () => data?.data.find((friend) => friend.id === selectedChat),
    [data, selectedChat]
  )

  const sendAskAI = async (message: string) => {
    const response = await getHelpFromAI({
      prompt: `${slideContext} ${messageLog} ${message}`
    })

    let responseMessage: any = ''
    if ('data' in response) {
      responseMessage = response.data?.data ?? response.data
    }
    dispatch(setChatMessages([
      ...messageLog, 
      {
      sender: SENDER_AI.MUMU_AI,
      body: responseMessage,
      timestamp: new Date(),
    }]))
  }

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

  console.log('stack', messageLog)
  return (
    <Stack
      // component={Card}
      direction='row'
      maxWidth={'xl'}
      sx={{ height: '72vh', backgroundColor: '#f0f0f0' }}
    >
      {renderNav}
      <Stack
        sx={{
          width: 1,
          height: 1,
          // overflow: 'hidden',
        }}
      >
        {renderHead}

        <Stack
          direction='row'
          sx={{
            width: 1,
            height: 1,
            // overflow: 'hidden',
            borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
          }}
        >
          <Stack
            sx={{
              width: 1,
              height: 1,
              // overflow: 'hidden',
            }}
          >
            <ChatMessageList messages={messageLog} />
            <ChatMessageInput
              sendMessage={(userMessage: string) => {
                // TODO: accomodate other message threads
                dispatch(
                  setChatMessages([
                    ...(messageLog as IChatMessage[]),
                    {
                      body: userMessage,
                      sender: profile?.id || 'Anonymous',
                      timestamp: new Date(),
                    } as IChatMessage,
                  ])
                )
                sendAskAI(userMessage)
                // Send message to AI with context
                // Render response
              }}
              // recipients={recipients}
              // selectedConversation={selectedChat}
            />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Chat
