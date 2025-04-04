import { useState, type CSSProperties, type FC } from 'react'

// import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

import CloseIcon from '@mui/icons-material/Close'
import { Box, IconButton, useTheme } from '@mui/material'
import { SxProps, Theme } from '@mui/system'
import { IoChatboxEllipsesOutline } from '@react-icons/all-files/io5/IoChatboxEllipsesOutline'
import Draggable from 'react-draggable'
import { useDispatch } from 'react-redux'

import useIsDesktop from '@/hooks/useIsDesktop'
import { setChatVisible } from '@/redux/slices/chat-handler'
import { useSelector } from '@/redux/store'
import { useAuthContext } from '@root/src/auth/useAuthContext'
import { CodePanelChat } from '@root/src/components/chat/CodePanelChat'

import AuthModal from '../../../../auth-modal/AuthModal'

interface IChatPopup {}

const ChatPopup: FC<IChatPopup> = ({}) => {
  const theme = useTheme()
  const isDesktop = useIsDesktop()
  const dispatch = useDispatch()
  const isChatVisible = useSelector((state) => state.chatHandler.isChatVisible)
  const { isAuthenticated } = useAuthContext()
  const [open, setOpen] = useState(false)

  const closeDialog = () => {
    setOpen(false)
  }

  const getContent = () => {
    if (!isChatVisible || !isAuthenticated) {
      return (
        <AuthModal
          open={open}
          onClose={closeDialog}
        ></AuthModal>
      )
    }

    if (isDesktop) {
      return (
        <Draggable>
          <div style={DRAGGABLE_STYLES}>
            <IconButton
              onClick={() => {
                dispatch(setChatVisible(false))
              }}
              sx={ICON_BUTTON_STYLES}
            >
              <CloseIcon />
            </IconButton>
            <CodePanelChat />
          </div>
        </Draggable>
      )
    }

    return (
      <Box sx={() => ({ ...getBoxStyles(theme) })}>
        <CodePanelChat />
      </Box>
    )
  }

  return (
    <>
      <IconButton
        sx={{
          display: isDesktop ? 'inline-flex' : 'none',
          background: isChatVisible ? '#c5d6e3' : theme.palette.background.default,
        }}
        onClick={() => {
          dispatch(setChatVisible(!isChatVisible))
          if (!isAuthenticated) {
            setOpen(true)
          }
        }}
      >
        <IoChatboxEllipsesOutline size={20} />
      </IconButton>

      {getContent()}
    </>
  )
}

const getBoxStyles = (theme: Theme): SxProps => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  height: '100vh',
  width: '100vw',
  zIndex: 5000,
  background: theme.palette.background.default,
})

const ICON_BUTTON_STYLES = {
  alignSelf: 'flex-end',
  p: '2px',
  mb: '2px',
}

const DRAGGABLE_STYLES: CSSProperties = {
  position: 'absolute',
  height: '500px',
  width: '800px',
  right: 20,
  bottom: 20,
  zIndex: 5000,
  display: 'flex',
  flexDirection: 'column',
}

export default ChatPopup
