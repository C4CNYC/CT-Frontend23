import { type FC } from 'react'

import { Stack } from '@mui/system'
import { useDispatch } from 'react-redux'

import { toggleBrowser, toggleInstrations } from '@/redux/slices/code-panel-global'
import { useSelector } from '@/redux/store'
import GalleryMenu from '@/sections/code-panel/components/footer/menu/index'
import { SupportedLang } from '@/sections/code-panel/lib/types'

import Menu from '../../code-panel/components/header/nav-bar/options/menu'
import Timer from '../../code-panel/components/header/nav-bar/options/timer'
import ViewTumbler from '../../code-panel/components/header/nav-bar/options/view-tumbler'

import SettingDrawer from './SettingsDrawer'

interface IDesktopBar {
  language: SupportedLang
  publicPage?: boolean
}

const DesktopBar: FC<IDesktopBar> = ({ language, publicPage }) => {
  const dispatch = useDispatch()
  const isBrowserHidden = useSelector((state) => state.codePanelGlobal.isBrowserHidden)
  const isInstructionsHidden = useSelector((state) => state.codePanelGlobal.isInstructionsHidden)

  const onChangeColumnVisibility = (value: boolean) => {
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
      <SettingDrawer />

      <GalleryMenu
        language={language}
        publicPage={publicPage}
      />

      <ViewTumbler
        isColumnHidden={isBrowserHidden && isInstructionsHidden}
        onChangeColumnVisability={onChangeColumnVisibility}
      />

      <Menu />
    </Stack>
  )
}

export default DesktopBar
