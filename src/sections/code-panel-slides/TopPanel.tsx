import { type FC, useMemo } from 'react'

import { Box, type SxProps } from '@mui/material'

import useIsDesktop from '@/hooks/useIsDesktop'
import { useSelector } from '@/redux/store'
import { SupportedLang } from '@/sections/code-panel/lib/types'
import { useIsAdmin } from '@root/src/lib/use-is-admin'

import GroupHeader from '../code-panel/components/header/group-header'
import HomeBtn from '../code-panel/components/header/home-btn'
import MobileBar from '../code-panel/components/header/nav-bar/mobile-bar'

import DesktopBar from './Topbar/DesktopBar'

interface ITopPanel {
  language: SupportedLang
  publicPage?: boolean
}

export const TopPanel: FC<ITopPanel> = ({ language }) => {
  const isDesktop = useIsDesktop()
  const boxStyles = useMemo(() => getBoxStyles(isDesktop), [isDesktop])
  const profile = useSelector((state) => state.global.user)
  const { isAdmin } = useIsAdmin()

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
      </Box>
      {profile && isAdmin ? <GroupHeader /> : ''}
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
