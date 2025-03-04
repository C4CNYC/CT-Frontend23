import { type FC, useMemo } from 'react'

import { Box, IconButton } from '@mui/material'
import { useDispatch } from 'react-redux'

import { setTab } from '@/redux/slices/mobile-tab-manager'
import { useSelector } from '@/redux/store'
import { Iconify } from '@root/src/components'

import { SWIPE_LEFT_STYLE, SWIPE_RIGHT_STYLE, getBoxStyles } from './constants'

interface TabButtonProps {
  orientation: string
}

const TabButton: FC<TabButtonProps> = ({ orientation }) => {
  const dispatch = useDispatch()
  const activeTab = useSelector((state) => state.mobileTabManager.activeTab)
  const boxStyles = useMemo(() => getBoxStyles(orientation), [orientation])
  const isLeftOrientation = orientation === 'left'

  const changeTab = (): void => {
    const nextTab = isLeftOrientation ? activeTab - 1 : activeTab + 1

    dispatch(setTab(nextTab))
  }

  return (
    <Box sx={boxStyles}>
      <IconButton onClick={changeTab}>
        {isLeftOrientation ? (
          <Iconify
            icon='akar-icons:arrow-back'
            width={25}
            color='#EE467A'
            style={SWIPE_RIGHT_STYLE}
          />
        ) : (
          <Iconify
            icon='akar-icons:arrow-forward'
            width={25}
            color='#EE467A'
            style={SWIPE_LEFT_STYLE}
          />
        )}
      </IconButton>
    </Box>
  )
}

export default TabButton
