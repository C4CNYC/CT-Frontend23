import { type FC } from 'react'

import { Stack } from '@mui/system'

import GalleryMenu from '@/sections/code-panel/components/footer/menu/index'
import { SupportedLang } from '@/sections/code-panel/lib/types'
import { useAuthContext } from '@root/src/auth/useAuthContext'

import { ChatPopup } from '../options/chat-popup'
import Menu from '../options/menu'
import Timer from '../options/timer'
import TumblerFullScreen from '../options/view-tumbler-separeted/tumbler-full-screen'

interface IDesktopBar {
  language: SupportedLang
  publicPage?: boolean
}

const DesktopBar: FC<IDesktopBar> = ({ language, publicPage }) => {
  const { user } = useAuthContext()
  let isAdmin = user?.role?.includes('admin')

  return (
    <Stack
      spacing={1}
      direction='row'
      alignItems='center'
    >
      <Timer />
      {isAdmin && <ChatPopup />}

      <GalleryMenu
        language={language}
        publicPage={publicPage}
      />

      <TumblerFullScreen />

      <Menu />
    </Stack>
  )
}

export default DesktopBar
