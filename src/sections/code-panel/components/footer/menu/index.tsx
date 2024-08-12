import { type FC, useMemo, useState } from 'react'

import { Chip, SpeedDial, SpeedDialAction, Typography, useTheme } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import { Box } from '@mui/system'
import { IoShareOutline } from '@react-icons/all-files/io5/IoShareOutline'

import useIsDesktop from '@/hooks/useIsDesktop'
import { useSelector } from '@/redux/store'
import { SupportedLang } from '@/sections/code-panel/lib/types'
import { useTranslate } from '@/utils/translateHelper'

import { getActions } from './config'
import {
  BOX_SX,
  SPEED_DIAL_SX,
  getActionFabPropsSx,
  getChipSx,
  getSpeedDialFabProps,
} from './constants'

export interface MenuProps {
  language: SupportedLang
  publicPage?: boolean
}

const Menu: FC<MenuProps> = ({ language, publicPage }) => {
  const classes = tooltipRewrite()
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

  const isDarkMode = useMemo(() => theme.palette.mode === 'dark', [theme.palette.mode])
  const speedDialFabProps = useMemo(
    () => getSpeedDialFabProps(speedDial, isDarkMode),
    [speedDial, isDarkMode]
  )
  const actionFabProps = useMemo(() => getActionFabPropsSx(isDarkMode, theme), [isDarkMode, theme])

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
      sx={{
        width: '40px',
        display: !isDesktop ? 'none' : 'flex',
        position: 'relative',
        minWidth: 40,
        height: 36,
      }}
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
          direction='down'
          icon={
            <IoShareOutline
              size='20px'
              style={{
                color: isDarkMode
                  ? theme.palette.text.secondary
                  : speedDial
                    ? '#43D4DD'
                    : '#637381',
              }}
            />
          }
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              TooltipClasses={{ tooltip: classes.tooltip }}
              tooltipTitle={
                <Box sx={BOX_SX}>
                  <Chip
                    label={action.isPublic ? translate('public') : translate('private')}
                    sx={getChipSx(action)}
                  />
                  <Typography variant='subtitle2'>{translate(action.name)}</Typography>
                </Box>
              }
              FabProps={actionFabProps}
            />
          ))}
        </SpeedDial>
      )}
    </Box>
  )
}

const tooltipRewrite = makeStyles(() => ({
  tooltip: {
    color: '#364954',
    background: '#fff',
  },
}))

export default Menu
