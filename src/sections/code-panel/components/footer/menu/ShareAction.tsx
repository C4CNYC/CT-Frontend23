import { forwardRef } from 'react'

import { Box, Chip, SpeedDialAction, Typography } from '@mui/material'

import { Iconify } from '@root/src/components/iconify/Iconify'
import { useSnackbar } from '@root/src/components/snackbar'
import { useCopyToClipboard } from '@root/src/hooks'
import { useTranslate } from '@root/src/utils/translateHelper'

import { BOX_SX, getActionFabPropsSx, getChipSx, tooltipRewrite } from './constants'

const ShareAction = forwardRef((props, ref) => {
  const classes = tooltipRewrite()
  const { enqueueSnackbar } = useSnackbar()
  const { copy } = useCopyToClipboard()
  const translate = useTranslate()
  return (
    <SpeedDialAction
      ref={ref}
      {...props}
      key={'copy_link_to_clipboard'}
      icon={
        <Iconify
          icon='ri:file-copy-line'
          color={'#74ca67'}
        />
      }
      onClick={() => {
        copy(window.location.href)
        enqueueSnackbar(translate('Link copied to clipboard'), {
          variant: 'success',
        })
      }}
      TooltipClasses={{ tooltip: classes.tooltip }}
      tooltipTitle={
        <Box sx={BOX_SX}>
          <Chip
            label={translate('Share')}
            sx={{ ...getChipSx('#74ca67'), color: '#fff' }}
          />
          <Typography variant='subtitle2'>{translate('Copy link to page')}</Typography>
        </Box>
      }
      FabProps={getActionFabPropsSx()}
    />
  )
})

export default ShareAction
