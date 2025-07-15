import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, IconButton, Paper, Typography } from '@mui/material'
import { type TooltipRenderProps } from 'react-joyride'

import { useTranslate } from '@root/src/utils/translateHelper'

import { ICON_BTN_SX, PAPER_SX, getBoxSx } from '../tour-tooltip/constants'

import { TourStep } from './CPTeacherTourConfig'

export function CPTeacherTourToolTip({
  index,
  step,
  size,
  backProps,
  primaryProps,
  tooltipProps,
  skipProps,
}: TooltipRenderProps & { step: TourStep }) {
  const translate = useTranslate()
  const isLastStep = index + 1 === size

  return (
    <Paper
      elevation={6}
      {...tooltipProps}
      sx={PAPER_SX}
    >
      <Box sx={getBoxSx(step.title)}>
        {!isLastStep && (
          <Typography
            variant='subtitle2'
            sx={{ pr: index === 0 ? 10 : 0 }}
          >
            {index + 1}/{size}
          </Typography>
        )}
        {step.title && <Typography variant='h5'>{step.title}</Typography>}

        {index + 1 !== size && (
          <IconButton
            {...skipProps}
            sx={ICON_BTN_SX}
          >
            <CloseIcon />
          </IconButton>
        )}
      </Box>

      <Box sx={{ maxWidth: '300px', py: 1, whiteSpace: 'pre-line' }}>{step.content}</Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {isLastStep ? (
          <Button {...skipProps}>
            {translate('actions_close')}
            <Box id='close' />
          </Button>
        ) : (
          <Button
            {...primaryProps}
            sx={{ px: 5 }}
          >
            {step.button}
            <Box id='next' />
          </Button>
        )}
      </Box>
    </Paper>
  )
}
