import { useEffect, useState } from 'react'

import JoyRide, { ACTIONS, type CallBackProps, EVENTS, STATUS } from 'react-joyride'
import { useDispatch } from 'react-redux'

import { setStartTour } from '@/redux/slices/tour'
import { useSelector } from '@/redux/store'
import { useTranslate } from '@root/src/utils/translateHelper'

import TooltipTourCodePanel from '../tour-tooltip'

import { getLessonCreationSteps } from './config'

const STATUSES: string[] = [STATUS.FINISHED, STATUS.PAUSED, STATUS.SKIPPED]

interface LessonCreationIntroProps {
  delay: number
}

export const LessonCreationIntro = ({ delay }: LessonCreationIntroProps) => {
  const translate = useTranslate()
  const dispatch = useDispatch()

  const [slideIndex, setSlideIndex] = useState(0)
  const [isHidden, setIsHidden] = useState<boolean>(true)

  const isTourStarted = useSelector((state) => state.tour.isStarted)

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { action, index, status, type } = data
    if (STATUSES.includes(status as string) && isTourStarted) {
      dispatch(setStartTour(false))
      setSlideIndex(0)
    } else if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
      setSlideIndex(Number(index) + Number(action === ACTIONS.PREV ? -1 : 1))
    }
  }

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('HAS_SEEN_LESSON_CREATION_INTRO')

    if (hasSeenTour) {
      return
    }

    const timeout = setTimeout(() => {
      dispatch(setStartTour(true))
      localStorage.setItem('HAS_SEEN_LESSON_CREATION_INTRO', 'true')
    }, 2000)
    return () => {
      clearTimeout(timeout)
    }
  }, [isTourStarted, dispatch])

  useEffect(() => {
    const id = setTimeout(() => {
      setIsHidden(false)
    }, delay)
  }, [])

  return isHidden ? null : (
    <JoyRide
      callback={handleJoyrideCallback}
      run={isTourStarted}
      tooltipComponent={TooltipTourCodePanel}
      steps={getLessonCreationSteps(translate)}
      showSkipButton={false}
      showProgress
      stepIndex={slideIndex}
      styles={JOY_RIDE_OPTIONS}
      floaterProps={{
        disableAnimation: true,
      }}
    />
  )
}

const JOY_RIDE_OPTIONS = { options: { zIndex: 10000 } }

export default LessonCreationIntro
