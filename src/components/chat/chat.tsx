import { Card, Stack } from '@mui/material'
import ChatNav from './chatNav'
import ChatMessageList from './chatMessageList'
import ChatMessageInput from './chatMessageInput'
import ChatHeaderDetail from './chatHeaderDetail'

export const Chat = (): React.ReactElement => {
  const renderNav = (
    <ChatNav
    //   contacts={contacts}
    //   conversations={conversations}
    //   loading={conversationsLoading}
    //   selectedConversationId={selectedConversationId}
    />
  )

  const renderHead = (
    <Stack
      direction='row'
      alignItems='center'
      flexShrink={0}
      sx={{ pr: 1, pl: 2.5, py: 1, minHeight: 72 }}
    >
      <ChatHeaderDetail />
      {/* {selectedConversationId ? (
        <>{details && <ChatHeaderDetail participants={participants} />}</>
      ) : (
        <ChatHeaderCompose contacts={contacts} onAddRecipients={handleAddRecipients} />
      )} */}
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
      // onAddRecipients={handleAddRecipients}
      // //
      // selectedConversationId={selectedConversationId}
      // disabled={!recipients.length && !selectedConversationId}
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

          {/* {details && <ChatRoom conversation={conversation} participants={participants} />} */}
        </Stack>
      </Stack>
    </Stack>
  )
}
