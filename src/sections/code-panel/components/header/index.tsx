import { type FC, useMemo } from 'react'

import { Box, type SxProps } from '@mui/material'

import useIsDesktop from '@/hooks/useIsDesktop'
import { useSelector } from '@/redux/store'
import { SupportedLang } from '@/sections/code-panel/lib/types'

import { LessonManager } from '../lesson-manager'

import GroupHeader from './group-header'
import HomeBtn from './home-btn'
import DesktopBar from './nav-bar/desktop-bar'
import MobileBar from './nav-bar/mobile-bar'

interface ITopPanel {
  language: SupportedLang
  publicPage?: boolean
}

const TopPanel: FC<ITopPanel> = ({ language }) => {
  const isDesktop = useIsDesktop()
  const boxStyles = useMemo(() => getBoxStyles(isDesktop), [isDesktop])
  const profile = useSelector((state) => state.global.user)

  return (
    <Box
      className='tourStart aiGeneratorTour1'
      sx={boxStyles}
    >
      <Box
        display='flex'
        gap={1}
      >
        {isDesktop && <HomeBtn />}
        {isDesktop && <LessonManager />}
      </Box>
      {profile ? <GroupHeader /> : ''}
      {isDesktop ? <DesktopBar language={language} /> : <MobileBar />}
    </Box>
  )
}

const getBoxStyles = (isDesktop: boolean): SxProps => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: isDesktop ? '38px' : '',
  pr: '24px',
  pl: '16px',
})

export default TopPanel
