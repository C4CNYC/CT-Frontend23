import { type FC } from 'react'

import { Stack } from '@mui/system'
import dynamic from 'next/dynamic'
import { useDispatch } from 'react-redux'

import { toggleBrowser, toggleInstrations } from '@/redux/slices/code-panel-global'
import { useSelector } from '@/redux/store'
import { SupportedLang } from '@/sections/code-panel/lib/types'

const SettingDrawer = dynamic(() => import('./SettingsDrawer'), { ssr: false })
const GalleryMenu = dynamic(() => import('@/sections/code-panel/components/footer/menu/index'), {
  ssr: false,
})
const Menu = dynamic(() => import('../../code-panel/components/header/nav-bar/options/menu'), {
  ssr: false,
})
const Timer = dynamic(() => import('../../code-panel/components/header/nav-bar/options/timer'), {
  ssr: false,
})
const ViewTumbler = dynamic(
  () => import('../../code-panel/components/header/nav-bar/options/view-tumbler'),
  { ssr: false }
)

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
