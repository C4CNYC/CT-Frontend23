import { useState } from 'react'

import { Box, Dialog } from '@mui/material'
import { GoogleOAuthProvider } from '@react-oauth/google'

import { IClass } from '@/redux/interfaces/class.interface'
import { BaseResponseInterface } from '@/utils/baseResponse.interface'

import JoinTribeLogin from './join-tribe-login'
import JoinTribeRegister from './join-tribe-register.tsx'
import JoinTribeContent from './JoinTribeContent'
import JoinTribeHeader from './JoinTribeHeader'

interface IJoinTribeModal {
  classInfo: IClass & BaseResponseInterface
  isSignIn?: boolean
}

export default function JoinTribeModal({
  classInfo,
  isSignIn,
}: IJoinTribeModal): React.ReactElement {
  const [isLogin, setIsLogin] = useState(true)
  const [modalOpen, setModalOpen] = useState(true)

  const handleCloseModal = (): void => {
    setModalOpen(false)
  }

  const handleChangeAuthorization = (): void => {
    setIsLogin(!isLogin)
  }

  return (
    <Dialog
      open={modalOpen}
      fullWidth
      maxWidth='xs'
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: '18px',
        },
      }}
    >
      <JoinTribeHeader classInfo={classInfo} />
      <Box
        py={3}
        px={2}
      >
        {isSignIn ? (
          <JoinTribeContent
            classId={classInfo.id}
            handleCloseModal={handleCloseModal}
          />
        ) : isLogin ? (
          <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID as string}>
            <JoinTribeLogin
              classId={classInfo.id}
              handleChangeAuthorization={handleChangeAuthorization}
            />
          </GoogleOAuthProvider>
        ) : (
          <JoinTribeRegister handleChangeAuthorization={handleChangeAuthorization} />
        )}
      </Box>
    </Dialog>
  )
}
