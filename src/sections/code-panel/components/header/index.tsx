import { type FC, type ReactNode, useMemo } from 'react'

import { Box, type SxProps } from '@mui/material'

import useIsDesktop from '@/hooks/useIsDesktop'
import { SupportedLang } from '@/sections/code-panel/lib/types'
import { LogoMin } from '@root/src/components'

import GroupHeader from './group-header'
import DesktopBar from './nav-bar/desktop-bar'
import MobileBar from './nav-bar/mobile-bar'

interface ITopPanel {
  chatComponent?: ReactNode | null
  onHandleFullScreen: () => void
  isFullScreenView: boolean
  lessonManagerComponent: ReactNode
  language: SupportedLang
  publicPage?: boolean
}

const TopPanel: FC<ITopPanel> = ({
  chatComponent,
  onHandleFullScreen,
  isFullScreenView,
  lessonManagerComponent,
  language,
  publicPage = false,
}) => {
  const isDesktop = useIsDesktop()
  const boxStyles = useMemo(() => getBoxStyles(isDesktop), [isDesktop])

  return (
    <Box
      className='tourStart'
      sx={boxStyles}
    >
      <Box
        display='flex'
        gap={2}
      >
        {isDesktop && <LogoMin sx={{ width: 'auto' }} />}
        {lessonManagerComponent}
      </Box>

      <GroupHeader />
      {isDesktop ? (
        <DesktopBar
          language={language}
          chatComponent={chatComponent}
          onHandleFullScreen={onHandleFullScreen}
          isFullScreenView={isFullScreenView}
        />
      ) : (
        <MobileBar />
      )}
    </Box>
  )
}

const getBoxStyles = (isDesktop: boolean): SxProps => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: isDesktop ? '50px' : '25px',
  px: '24px',
})

export default TopPanel
