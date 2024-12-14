import { type FC } from 'react'

import { Box, Typography } from '@mui/material'

import useIsDesktop from '@/hooks/useIsDesktop'

import { COLLAPSEBAR_TITLE_SX, getCollapsebarSx } from './constants'

interface IHidedTabRtn {
  title: string
  icon: React.ReactElement
  openPanelFnc: () => void
}

const HidedTabBtn: FC<IHidedTabRtn> = ({ icon, title, openPanelFnc }) => {
  const isDesktop = useIsDesktop()
  const isTabletAndMobile = !isDesktop

  return (
    <>
      <Box
        position='relative'
        onClick={() => {
          openPanelFnc()
        }}
        sx={getCollapsebarSx(isTabletAndMobile, title)}
      >
        {icon}
        <Typography sx={COLLAPSEBAR_TITLE_SX}>{title}</Typography>
      </Box>
    </>
  )
}

export default HidedTabBtn
