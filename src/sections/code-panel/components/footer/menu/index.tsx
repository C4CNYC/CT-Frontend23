import { type FC, useMemo, useState } from 'react'

import { Chip, SpeedDial, SpeedDialAction, Typography, useTheme } from '@mui/material'
import { Box } from '@mui/system'
import { GiSave } from '@react-icons/all-files/gi/GiSave'

import useIsDesktop from '@/hooks/useIsDesktop'
import { useSelector } from '@/redux/store'
import { SupportedLang } from '@/sections/code-panel/lib/types'
import { useTranslate } from '@/utils/translateHelper'

import { getActions } from './config'
import {
  ACTION_FAB_PROPS,
  BOX_SX,
  SPEED_DIAL_SX,
  getChipSx,
  getSpeedDialFabProps,
} from './constants'

export interface MenuProps {
  language: SupportedLang
  publicPage?: boolean
}

const Menu: FC<MenuProps> = ({ language, publicPage }) => {
  const code = useSelector((state) => state.codePanelGlobal.code)

  const theme = useTheme()
  const isDesktop = useIsDesktop()
  const [speedDial, setSpeedDial] = useState(false)
  const openSpeedDial = () => {
    setSpeedDial(true)
  }

  const closeSpeedDial = () => {
    setSpeedDial(false)
  }

  const speedDialFabProps = useMemo(() => getSpeedDialFabProps(speedDial), [speedDial])
  const actions = useMemo(
    () =>
      getActions({
        code,
        language,
      }),
    [code, language]
  )
  const translate = useTranslate()

  const isContentExist = !publicPage && isDesktop

  return (
    <Box
      className='tourBottombarMenu'
      sx={{ width: '50px', display: !isDesktop ? 'none' : 'flex' }}
    >
      {isContentExist && (
        <SpeedDial
          aria-describedby='popper'
          ariaLabel='SpeedDial menu bottom'
          open={speedDial}
          onClose={closeSpeedDial}
          onOpen={openSpeedDial}
          FabProps={speedDialFabProps}
          sx={SPEED_DIAL_SX}
          direction='up'
          icon={
            <GiSave
              size='20px'
              style={{ color: speedDial ? '#43D4DD' : '#b3b3b3' }}
            />
          }
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              TooltipClasses={{
                tooltip: 'color: #364954; background: transparent',
              }}
              tooltipTitle={
                <Box sx={BOX_SX}>
                  <Chip
                    label={action.isPublic ? translate('public') : translate('private')}
                    sx={getChipSx(action)}
                  />
                  <Typography variant='subtitle2'>{translate(action.name)}</Typography>
                </Box>
              }
              FabProps={ACTION_FAB_PROPS}
            />
          ))}
        </SpeedDial>
      )}
    </Box>
  )
}

export default Menu
