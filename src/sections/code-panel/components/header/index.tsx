import { type FC, type ReactNode, useMemo } from 'react'

import { Box, type SxProps } from '@mui/material'

import useIsDesktop from '@/hooks/useIsDesktop'

import GroupHeader from './group-header'
import Logo from './logo'
import DesktopBar from './nav-bar/desktop-bar'
import MobileBar from './nav-bar/mobile-bar'

interface ITopPanel {
  chatComponent?: ReactNode | null
  onHandleFullScreen: () => void
  isFullScreenView: boolean
}

const TopPanel: FC<ITopPanel> = ({ chatComponent, onHandleFullScreen, isFullScreenView }) => {
  const isDesktop = useIsDesktop()
  const boxStyles = useMemo(() => getBoxStyles(isDesktop), [isDesktop])

  return (
    <Box
      className='tourStart'
      sx={boxStyles}
    >
      <Logo />
      <GroupHeader />
      {isDesktop ? (
        <DesktopBar
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
