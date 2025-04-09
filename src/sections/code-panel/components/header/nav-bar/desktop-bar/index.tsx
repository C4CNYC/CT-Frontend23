import { type FC } from 'react'

import { Stack } from '@mui/system'
import { useDispatch } from 'react-redux'

import { toggleBrowser, toggleInstrations } from '@/redux/slices/code-panel-global'
import { useSelector } from '@/redux/store'
import GalleryMenu from '@/sections/code-panel/components/footer/menu/index'
import { SupportedLang } from '@/sections/code-panel/lib/types'
import { useAuthContext } from '@root/src/auth/useAuthContext'
import { ChatAi } from '@root/src/components/chat/hooks/ChatAi'

import ChatPopup from '../options/chat-popup'
import Menu from '../options/menu'
import SettingDrawer from '../options/setting-drawer'
import Timer from '../options/timer'
import ViewTumbler from '../options/view-tumbler'

interface IDesktopBar {
  language: SupportedLang
  publicPage?: boolean
}

const DesktopBar: FC<IDesktopBar> = ({ language, publicPage }) => {
  const { user } = useAuthContext()
  let isAdmin = user?.role?.includes('admin')
  const dispatch = useDispatch()
  const isBrowserHidden = useSelector((state) => state.codePanelGlobal.isBrowserHidden)
  const isInstructionsHidden = useSelector((state) => state.codePanelGlobal.isInstructionsHidden)

  const onChangeColumnVisability = (value: boolean) => {
    dispatch(toggleBrowser(value))
    dispatch(toggleInstrations(value))
  }

  const chatAi = ChatAi() // to trigger the chat popup

  return (
    <Stack
      spacing={1}
      direction='row'
      alignItems='center'
    >
      <Timer />
      {isAdmin && <ChatPopup />}
      {/* <NotificationsDrawer
        data={[
          {
            id: '023842034320',
            type: 'project',
            category: 'Project UI',
            avatarUrl: '/assets/icons/home/ic_development.svg',
            createdAt: '',
            isUnRead: true,
            title: 'some title',
          },
        ]}
      /> */}
      <SettingDrawer />

      <GalleryMenu
        language={language}
        publicPage={publicPage}
      />

      <ViewTumbler
        isColumnHidden={isBrowserHidden && isInstructionsHidden}
        onChangeColumnVisability={onChangeColumnVisability}
      />

      <Menu />
    </Stack>
  )
}

export default DesktopBar
