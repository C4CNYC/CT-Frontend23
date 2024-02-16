import { type FC, useCallback, useMemo } from 'react'

import { Badge, SpeedDial, SpeedDialAction, useTheme } from '@mui/material'
import { BsLightningCharge } from '@react-icons/all-files/bs/BsLightningCharge'
import { useDispatch } from 'react-redux'

import { setChatVisible } from '@/redux/slices/chat-handler'
import { useSelector } from '@/redux/store'

import { getActions } from './config'
import {
  BADGE_SX,
  SPEED_DIAL_ACTION_FAB_PROPS,
  getSpeedDealSx,
  getSpeedDialFabProps,
} from './constants'

interface NavigationSpeedDialProps {
  stepHasValidation: boolean
}

const NavigationSpeedDial: FC<NavigationSpeedDialProps> = ({ stepHasValidation }) => {
  const theme = useTheme()
  const dispatch = useDispatch()
  const isChatVisible = useSelector((state) => state.chatHandler.isChatVisible)
  const onToggleChat = useCallback(() => {
    dispatch(setChatVisible(!isChatVisible))
  }, [isChatVisible])

  const actions = useMemo(() => getActions(onToggleChat), [onToggleChat])
  const speedDialFabProps = useMemo(
    () => getSpeedDialFabProps(stepHasValidation),
    [stepHasValidation]
  )
  const speedDialSx = useMemo(() => getSpeedDealSx(theme), [theme])

  return (
    <SpeedDial
      ariaLabel='SpeedDial basic example'
      FabProps={speedDialFabProps}
      sx={speedDialSx}
      icon={
        <Badge
          sx={BADGE_SX}
          color='secondary'
          variant='dot'
        >
          <BsLightningCharge size='30px' />
        </Badge>
      }
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={action.action}
          tooltipPlacement='top-start'
          FabProps={SPEED_DIAL_ACTION_FAB_PROPS}
        />
      ))}
    </SpeedDial>
  )
}

export default NavigationSpeedDial
