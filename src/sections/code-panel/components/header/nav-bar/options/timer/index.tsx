// node modules
import { type FC } from 'react'

import { IconButton, Popover, Stack } from '@mui/material'
import { MdOutlineTimer } from '@react-icons/all-files/md/MdOutlineTimer'
import { RxCross2 } from '@react-icons/all-files/rx/RxCross2'

import { useTranslate } from '@/utils/translateHelper'

import TimerButton from './button/timer-button'
// local files
import {
  CIRCULAR_PROGRESS_WIDTH,
  MIN_GAP,
  OUTLINE_TIMER_SIZE,
  PAROGRESS_LABEL_FONT_SIZE,
  POPOVER_ANCHOR_ORIGIN,
  POPOVER_TRANSFORM_ORIGIN,
  PROGRESS_LABEL_DESKTOP_SIZE,
  PROGRESS_LABEL_MOBILE_SIZE,
  RX_CROSS_SIZE,
} from './constants'
import { CircularProgressWithLabel } from './progress'
import { CloseButton, FinishText, InputNumber, TextHint } from './styles'
import { DEFAULT_MINUTES, useTimer } from './useTimer.hook'

interface TimerProps {
  mobile?: boolean
}

const Timer: FC<TimerProps> = ({ mobile = false }) => {
  const translate = useTranslate()

  const {
    onTimeInputChange,
    timerHandler,
    setFinishTimer,
    onResumeClick,
    onPauseClick,
    onRestartClick,
    onCloseClick,
    onKeepCodingClick,
    onStartClick,
    timerAnchorEl,
    finish,
    openTimer,
    animationsStart,
    time,
    start,
    minutes,
    pause,
  } = useTimer()

  const isTimerStartButtonDisabled = minutes < DEFAULT_MINUTES
  const minuteTitle =
    minutes === DEFAULT_MINUTES ? translate('timer_minute') : translate('timer_minutes')
  const labelSize = mobile ? PROGRESS_LABEL_MOBILE_SIZE : PROGRESS_LABEL_DESKTOP_SIZE

  return (
    <>
      <IconButton
        onClick={timerHandler}
        sx={{ p: 1 }}
        aria-label='Timer'
        size='large'
      >
        {start && !finish ? (
          <CircularProgressWithLabel
            width={labelSize}
            height={labelSize}
            fontSize={PAROGRESS_LABEL_FONT_SIZE}
            min={minutes}
            pause={pause}
            delay={animationsStart}
            setFinish={setFinishTimer}
          />
        ) : (
          <MdOutlineTimer size={OUTLINE_TIMER_SIZE} />
        )}
      </IconButton>
      <Popover
        anchorOrigin={POPOVER_ANCHOR_ORIGIN}
        transformOrigin={POPOVER_TRANSFORM_ORIGIN}
        anchorEl={timerAnchorEl}
        open={openTimer}
        onClose={onCloseClick}
        sx={{ overflow: 'unset', p: 2 }}
      >
        <Stack
          direction='column'
          style={{ height: '100%' }}
          alignItems='center'
          justifyContent='space-around'
          sx={{ p: 3 }}
        >
          {!start && !finish ? (
            <Stack
              direction='column'
              alignItems='center'
              sx={{ overflow: 'unset' }}
            >
              <InputNumber
                type='number'
                value={minutes}
                onChange={onTimeInputChange}
              />
              <TextHint variant='body1'>{minuteTitle}</TextHint>
            </Stack>
          ) : start && !finish ? (
            <Stack
              direction='column'
              alignItems='center'
            >
              <CircularProgressWithLabel
                width={CIRCULAR_PROGRESS_WIDTH}
                height={CIRCULAR_PROGRESS_WIDTH}
                min={minutes}
                pause={pause}
                delay={animationsStart}
                open={openTimer}
                time={time}
              />
              <TextHint variant='body1'>{minuteTitle}</TextHint>
            </Stack>
          ) : (
            <Stack
              direction='column'
              alignItems='center'
              justifyContent='space-between'
            >
              <FinishText variant='body1'>{translate('timer_finish')}</FinishText>
              <picture>
                <img
                  src='https://i.giphy.com/l4HogV6533Je2oG40.gif'
                  width='150px'
                  height='130px'
                  alt='Your GIF'
                />
              </picture>
            </Stack>
          )}
          {!start && !finish ? (
            <Stack
              direction='row'
              gap={MIN_GAP}
              mt={MIN_GAP}
              justifyContent='space-between'
            >
              <TimerButton
                text={translate('actions_cancel')}
                color='inherit'
                variant='soft'
                onClick={onCloseClick}
              />

              <TimerButton
                text={translate('actions_start')}
                color='success'
                variant='contained'
                disabled={isTimerStartButtonDisabled}
                onClick={onStartClick}
              />
            </Stack>
          ) : start && !finish ? (
            <Stack
              direction='row'
              gap={MIN_GAP}
              mt={MIN_GAP}
              justifyContent='space-between'
            >
              {pause ? (
                <TimerButton
                  text={translate('actions_resume')}
                  color='info'
                  variant='soft'
                  onClick={onResumeClick}
                />
              ) : (
                <TimerButton
                  text={translate('actions_pause')}
                  color='info'
                  variant='soft'
                  onClick={onPauseClick}
                />
              )}
              <TimerButton
                text={translate('keep_coding')}
                color='success'
                variant='contained'
                onClick={onKeepCodingClick}
              />
            </Stack>
          ) : (
            <Stack
              direction='row'
              gap={MIN_GAP}
              justifyContent='space-between'
            >
              <TimerButton
                text={translate('actions_close')}
                color='inherit'
                variant='soft'
                onClick={onCloseClick}
              />
              <TimerButton
                text={translate('actions_restart')}
                color='info'
                variant='contained'
                onClick={onRestartClick}
              />
            </Stack>
          )}
        </Stack>
        <CloseButton onClick={start ? onKeepCodingClick : onCloseClick}>
          <RxCross2 size={RX_CROSS_SIZE} />
        </CloseButton>
      </Popover>
    </>
  )
}

export default Timer
