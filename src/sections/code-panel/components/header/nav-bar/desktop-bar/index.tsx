import { type FC, type ReactNode } from 'react'

import { Stack } from '@mui/system'
import { useDispatch } from 'react-redux'

import { toggleBrowser, toggleInstrations } from '@/redux/slices/code-panel-global'
import { useSelector } from '@/redux/store'
import GalleryMenu from '@/sections/code-panel/components/footer/menu/index'
import { SupportedLang } from '@/sections/code-panel/lib/types'
// import { NotificationsDrawer } from '@root/src/components/notifications-drawer'

import ChatPopup from '../options/chat-popup'
// import HelpPopup from "../options/help-popup";
import Menu from '../options/menu'
import SettingDrawer from '../options/setting-drawer'
import Timer from '../options/timer'
import ViewTumbler from '../options/view-tumbler'

interface IDesktopBar {
  chatComponent: ReactNode
  onHandleFullScreen: () => void
  isFullScreenView: boolean
  language: SupportedLang
  publicPage?: boolean
}

const DesktopBar: FC<IDesktopBar> = ({
  chatComponent,
  onHandleFullScreen,
  isFullScreenView,
  language,
  publicPage,
}) => {
  const dispatch = useDispatch()
  const isBrowserHidden = useSelector((state) => state.codePanelGlobal.isBrowserHidden)
  const isInstructionsHidden = useSelector((state) => state.codePanelGlobal.isInstructionsHidden)

  const onChangeColumnVisability = (value: boolean) => {
    dispatch(toggleBrowser(value))
    dispatch(toggleInstrations(value))
  }

  return (
    <Stack
      spacing={1}
      direction='row'
      alignItems='center'
    >
      <Timer />
      {/* {Hide Help Popover before v1} */}
      {/* <HelpPopup /> */}

      <ChatPopup chatComponent={chatComponent} />
      {/* <NotificationsDrawer
        data={[
          {
            id: 'sdcsdsc',
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
        onHandleFullScreen={onHandleFullScreen}
        isFullScreenView={isFullScreenView}
        isColumnHidden={isBrowserHidden && isInstructionsHidden}
        onChangeColumnVisability={onChangeColumnVisability}
      />

      <Menu />
    </Stack>
  )
}

export default DesktopBar
