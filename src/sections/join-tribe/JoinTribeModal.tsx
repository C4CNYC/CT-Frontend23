import { useMemo, useState } from 'react'

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

enum PageType {
  LOGIN = 'login',
  REGISTER = 'register',
}

export default function JoinTribeModal({
  classInfo,
  isSignIn,
}: IJoinTribeModal): React.ReactElement {
  const [modal, setModal] = useState<PageType>(PageType.REGISTER)
  const [modalOpen, setModalOpen] = useState(true)

  const content = useMemo(() => {
    if (isSignIn) {
      return (
        <JoinTribeContent
          classId={classInfo.id}
          handleCloseModal={() => setModalOpen(false)}
        />
      )
    }

    switch (modal) {
      case PageType.LOGIN:
        return (
          <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID as string}>
            <JoinTribeLogin
              classId={classInfo.id}
              handleChangeAuthorization={() => setModal(PageType.REGISTER)}
            />
          </GoogleOAuthProvider>
        )
      case PageType.REGISTER:
        return (
          <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID as string}>
            <JoinTribeRegister
              classId={classInfo.id}
              handleChangeAuthorization={() => setModal(PageType.LOGIN)}
            />
          </GoogleOAuthProvider>
        )
    }
  }, [modal, classInfo, setModal, isSignIn])

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
        {content}
      </Box>
    </Dialog>
  )
}
