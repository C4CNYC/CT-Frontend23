import { useMemo } from 'react'

import { Button, Divider, Stack } from '@mui/material'
import { FaPlay } from '@react-icons/all-files/fa/FaPlay'
import { GrRefresh } from '@react-icons/all-files/gr/GrRefresh'
import { useDispatch } from 'react-redux'

import { toggleBrowser, toggleInstrations } from '@/redux/slices/code-panel-global'
import { useSelector } from '@/redux/store'
import useIsDesktop from '@root/src/hooks/useIsDesktop'
import { useTranslate } from '@root/src/utils/translateHelper'

import SettingDrawer from '../../../../../header/nav-bar/options/setting-drawer'
import TumblerFocusMode from '../../../../../header/nav-bar/options/view-tumbler-separeted/tumbler-focus-mode'

import {
  btnStyles,
  PREVIEW_CONT_SX,
  PUBLISH_COLOR,
  REFRESH_COLOR,
  RUN_COLOR,
  STOP_COLOR,
  PREVIEW_SETTINGS_SX,
} from './constants'

interface PreviewControlsProps {
  disabled?: boolean
  isRunning?: boolean
  isAutoRun?: boolean
  reloadIframe?: () => void
}

const PreviewControls = ({
  disabled,
  isRunning,
  isAutoRun,
  reloadIframe,
}: PreviewControlsProps) => {
  const dispatch = useDispatch()
  const translate = useTranslate()
  const isDesktop = useIsDesktop()
  const btnStartStop = useMemo(
    () => btnStyles(!!disabled, isRunning ? RUN_COLOR : STOP_COLOR),
    [disabled, isRunning]
  )
  const btnRefresh = useMemo(() => btnStyles(!!disabled, REFRESH_COLOR), [disabled])
  const btnPublish = useMemo(() => btnStyles(!!disabled, PUBLISH_COLOR), [disabled])

  const isBrowserHidden = useSelector((state) => state.codePanelGlobal.isBrowserHidden)
  const isInstructionsHidden = useSelector((state) => state.codePanelGlobal.isInstructionsHidden)

  const onChangeColumnVisability = (value: boolean) => {
    dispatch(toggleBrowser(value))
    dispatch(toggleInstrations(value))
  }

  return (
    <Stack sx={PREVIEW_CONT_SX}>
      {!isAutoRun && (
        <Stack
          direction='row'
          spacing={1}
        >
          <Button
            sx={btnStartStop}
            onClick={reloadIframe}
          >
            {isRunning ? translate('preview_controls_stop') : translate('preview_controls_run')}
            <FaPlay size={12} />
          </Button>
          {!isDesktop ? (
            <Divider
              flexItem
              orientation='vertical'
            />
          ) : null}
          <Button
            disabled={disabled}
            sx={btnRefresh}
            onClick={reloadIframe}
          >
            {translate('preview_controls_refresh')}
            <GrRefresh />
          </Button>
        </Stack>
      )}

      <Stack sx={PREVIEW_SETTINGS_SX}>
        <TumblerFocusMode
          isColumnHidden={isBrowserHidden && isInstructionsHidden}
          onChangeColumnVisability={onChangeColumnVisability}
        />

        <SettingDrawer />
      </Stack>

      {/* TODO:
      <Button
        disabled={disabled}
        sx={{ ...btnPublish, ml: 'auto' }}
      >
        {translate('preview_controls_publish')}
       
      </Button> */}
    </Stack>
  )
}

export default PreviewControls
