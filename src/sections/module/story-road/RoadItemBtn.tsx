import { useMemo } from 'react'

import { Button, Stack, Typography } from '@mui/material'
import { FaArrowRight } from '@react-icons/all-files/fa/FaArrowRight'

import { useTranslate } from '@root/src/utils/translateHelper'

import LessonDialog from '../lesson-item/LessonDialog'

import { getButtonSx, getMobileButtonSx } from './constants'

interface IRoadItemBtn {
  getLinkToCodePanel: () => void
  lastActive: boolean
  completed: boolean
  locked: boolean
  isMobile?: boolean
}

const RoadItemBtn = ({
  getLinkToCodePanel,
  lastActive,
  completed,
  locked,
  isMobile,
}: IRoadItemBtn) => {
  const translate = useTranslate()
  const buttonSx = useMemo(
    () => (isMobile ? getMobileButtonSx(lastActive) : getButtonSx(lastActive)),
    [lastActive, isMobile]
  )

  const getBtn = () => {
    if (completed)
      return (
        <Button
          variant='contained'
          onClick={getLinkToCodePanel}
          disableRipple
          sx={buttonSx}
        >
          Review
        </Button>
      )
    if (lastActive)
      return (
        <Button
          variant='contained'
          onClick={getLinkToCodePanel}
          disableRipple
          sx={buttonSx}
        >
          <Stack
            direction='row'
            alignItems='center'
            gap={0.5}
          >
            <Stack>
              <Typography
                variant='body1'
                fontWeight={700}
              >
                Explore
              </Typography>
              <Typography
                variant='body1'
                fontWeight={700}
              >
                Now
              </Typography>
            </Stack>
            <FaArrowRight size={18} />
          </Stack>
        </Button>
      )
    if (locked)
      return (
        <LessonDialog onOpenLesson={getLinkToCodePanel}>
          <Button
            variant='contained'
            disableRipple
            sx={buttonSx}
          >
            {translate('open')}
          </Button>
        </LessonDialog>
      )

    return (
      <Button
        variant='contained'
        onClick={getLinkToCodePanel}
        disableRipple
        sx={buttonSx}
      >
        {translate('actions_continue')}
      </Button>
    )
  }
  return getBtn()
}

export default RoadItemBtn
