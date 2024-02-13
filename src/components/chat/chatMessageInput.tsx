import { sub } from 'date-fns'
import PropTypes from 'prop-types'
import { useRef, useMemo, useState, useCallback } from 'react'

import Stack from '@mui/material/Stack'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import { CiChat1 } from '@react-icons/all-files/ci/CiChat1'
import { useRouter } from 'next/router'

// import { paths } from 'src/routes/paths'
// import { useRouter } from 'src/routes/hooks'

// import { useMockedUser } from 'src/hooks/use-mocked-user'

// import uuidv4 from 'src/utils/uuidv4'

// import { sendMessage, createConversation } from 'src/api/chat'

// import Iconify from 'src/components/iconify'

// ----------------------------------------------------------------------

export default function ChatMessageInput(
  {
    //   recipients,
    //   onAddRecipients,
    //   //
    //   disabled,
    //   selectedConversationId,
  }
) {
  const router = useRouter()

  //   const { user } = useMockedUser()

  const fileRef = useRef(null)

  const [message, setMessage] = useState('')

  //   const myContact = useMemo(
  //     () => ({
  //       id: `${user?.id}`,
  //       role: `${user?.role}`,
  //       email: `${user?.email}`,
  //       address: `${user?.address}`,
  //       name: `${user?.displayName}`,
  //       lastActivity: new Date(),
  //       avatarUrl: `${user?.photoURL}`,
  //       phoneNumber: `${user?.phoneNumber}`,
  //       status: 'online',
  //     }),
  //     [user]
  //   )

  const messageData = useMemo(
    () => ({
      //   id: uuidv4(),
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
      //   id: uuidv4(),
      messages: [messageData],
      //   participants: [...recipients, myContact],
      //   type: recipients.length > 1 ? 'GROUP' : 'ONE_TO_ONE',
      unreadCount: 0,
    }),
    [messageData]
  )

  const handleAttach = useCallback(() => {
    if (fileRef.current) {
      //   fileRef.current.click()
    }
  }, [])

  const handleChangeMessage = useCallback((event: InputEvent) => {
    setMessage(event?.target?.value)
  }, [])

  const handleSendMessage = useCallback(
    async (event: { key: string }) => {
      try {
        if (event.key === 'Enter') {
          if (message) {
            // if (selectedConversationId) {
            //   await sendMessage(selectedConversationId, messageData)
            // } else {
            //   const res = await createConversation(conversationData)
            //   router.push(`${paths.dashboard.chat}?id=${res.conversation.id}`)
            //   onAddRecipients([])
            // }
          }
          setMessage('')
        }
      } catch (error) {
        console.error(error)
      }
    },
    [conversationData, message, messageData, router]
  )

  return (
    <>
      <InputBase
        value={message}
        onKeyUp={handleSendMessage}
        onChange={handleChangeMessage}
        placeholder='Type a message'
        disabled={false}
        startAdornment={
          <IconButton>
            <CiChat1 />
          </IconButton>
        }
        endAdornment={
          <Stack direction='row' sx={{ flexShrink: 0 }}>
            <IconButton onClick={handleAttach}>
              <CiChat1 />
            </IconButton>
            <IconButton onClick={handleAttach}>
              <CiChat1 />
            </IconButton>
            <IconButton>
              <CiChat1 />
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

      <input type='file' ref={fileRef} style={{ display: 'none' }} />
    </>
  )
}
