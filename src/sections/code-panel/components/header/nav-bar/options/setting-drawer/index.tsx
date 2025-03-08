import { useState } from 'react'

import { IconButton, Stack, SwipeableDrawer, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { IoSettingsOutline } from '@react-icons/all-files/io5/IoSettingsOutline'
import { useDispatch } from 'react-redux'

import { setStartTour } from '@/redux/slices/tour'
import { useTranslate } from '@/utils/translateHelper'
import ThemeSwitcher from '@root/src/components/theme-switcher'
import useIsDesktop from '@root/src/hooks/useIsDesktop'
import {
  updateColorsEvent,
  updateFontSize,
  updateLineWrap,
} from 'src/sections/code-panel/lib/events'

import EditColors from './preferences/EditColors'
import EditorFontSize from './preferences/EditorFontSize'
import EditorWordWrap from './preferences/EditorWordWrap'
import IntroTour from './preferences/IntroTour'
import ResetCode from './preferences/ResetCode'

interface ISettingDrawerProps {
  iconColor?: string
}

const SettingDrawer = ({ iconColor = '#637381' }: ISettingDrawerProps): React.ReactElement => {
  const dispatch = useDispatch()
  const translate = useTranslate()
  const isDesktop = useIsDesktop()

  const [openDrawer, setDrawer] = useState(false)

  const onStartIntro = (): void => {
    setDrawer(false)
    dispatch(setStartTour(true))
  }

  return (
    <Box sx={BOX_STYLES}>
      <IconButton
        onClick={() => {
          setDrawer(true)
        }}
      >
        <IoSettingsOutline style={{ color: iconColor }} />
      </IconButton>
      <SwipeableDrawer
        swipeAreaWidth={0}
        anchor='right'
        open={openDrawer}
        onClose={() => {
          setDrawer(false)
        }}
        onOpen={() => {
          setDrawer(true)
        }}
      >
        <Box
          width={isDesktop ? '350px' : '260px'}
          p='16px 20px 40px 20px'
        >
          <Stack
            justifyContent='space-between'
            direction='row'
            alignItems='center'
            mb='8px'
          >
            <Box
              display='flex'
              alignItems='center'
              gap={1}
            >
              <IoSettingsOutline size={25} />

              <Typography variant='h5'>{translate('settings')}</Typography>
            </Box>
            <ThemeSwitcher />
          </Stack>

          <Box
            display='grid'
            gap='12px'
          >
            <ResetCode />

            <IntroTour onStartIntro={onStartIntro} />

            <Typography variant='subtitle2'>{translate('coding_editor')}</Typography>

            <EditorFontSize
              onUpdateFontSize={(size: number) => {
                window.dispatchEvent(updateFontSize({ detail: { size } }))
              }}
            />

            <EditorWordWrap
              onUpdateWordWrap={(wrap: boolean) => {
                window.dispatchEvent(updateLineWrap({ detail: { wrap } }))
              }}
            />

            <Typography variant='subtitle2'>{translate('customize')}</Typography>

            <EditColors
              onUpdateColors={(data) => {
                window.dispatchEvent(updateColorsEvent(data))
              }}
            />
          </Box>
        </Box>
      </SwipeableDrawer>
    </Box>
  )
}

const BOX_STYLES = {
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
}

export default SettingDrawer
