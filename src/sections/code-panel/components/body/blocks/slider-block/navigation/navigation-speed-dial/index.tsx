import { SpeedDial, SpeedDialAction } from '@mui/material'
import { BsLightningCharge } from '@react-icons/all-files/bs/BsLightningCharge'

import { useFullScreen } from '@root/src/sections/code-panel/lib/FullScreenContext'

import { getActions } from './config'
import { SPEED_DIAL_ACTION_FAB_PROPS, SPEED_DIAL_FAB_PROPS, SPEED_DIAL_SX } from './constants'

interface NavigationSpeedDialProps {
  lessonName?: string
}

const NavigationSpeedDial = ({ lessonName = '' }: NavigationSpeedDialProps) => {
  const handle = useFullScreen()
  return (
    <SpeedDial
      ariaLabel='SpeedDial basic example'
      FabProps={SPEED_DIAL_FAB_PROPS}
      sx={SPEED_DIAL_SX}
      icon={<BsLightningCharge size='30px' />}
    >
      {getActions({ lessonName, handle }).map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          tooltipPlacement='top-start'
          FabProps={{ sx: SPEED_DIAL_ACTION_FAB_PROPS }}
        />
      ))}
    </SpeedDial>
  )
}

export default NavigationSpeedDial
