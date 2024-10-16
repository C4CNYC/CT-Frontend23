import { useMemo } from 'react'

import { Button, Stack } from '@mui/material'

import { Iconify } from '@root/src/components'
import { useTranslate } from '@root/src/utils/translateHelper'

import {
  btnStyles,
  PREVIEW_CONT_SX,
  PUBLISH_COLOR,
  REFRESH_COLOR,
  RUN_COLOR,
  STOP_COLOR,
} from './constants'

interface PreviewControlsProps {
  disabled?: boolean
  isRunning?: boolean
  reloadIframe?: () => void
}

const PreviewControls = ({ disabled, isRunning, reloadIframe }: PreviewControlsProps) => {
  const translate = useTranslate()
  const btnStartStop = useMemo(
    () => btnStyles(!!disabled, isRunning ? RUN_COLOR : STOP_COLOR),
    [disabled, isRunning]
  )
  const btnRefresh = useMemo(() => btnStyles(!!disabled, REFRESH_COLOR), [disabled])
  const btnPublish = useMemo(() => btnStyles(!!disabled, PUBLISH_COLOR), [disabled])

  return (
    <Stack sx={PREVIEW_CONT_SX}>
      <Button
        disabled={disabled}
        sx={btnStartStop}
      >
        {isRunning ? translate('preview_controls_run') : translate('preview_controls_stop')}
        <Iconify
          icon='solar:play-bold'
          width={18}
          height={18}
        />
      </Button>
      <Button
        disabled={disabled}
        sx={btnRefresh}
        onClick={reloadIframe}
      >
        {translate('preview_controls_publish')}
        <Iconify icon='ic:round-refresh' />
      </Button>
      <Button
        disabled={disabled}
        sx={{ ...btnPublish, ml: 'auto' }}
      >
        {translate('preview_controls_refresh')}
        <Iconify icon='mage:megaphone-a' />
      </Button>
    </Stack>
  )
}

export default PreviewControls
