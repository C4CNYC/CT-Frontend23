import { useEffect, useState } from 'react'

import JoyRide, { ACTIONS, type CallBackProps, EVENTS, STATUS } from 'react-joyride'
import { useDispatch } from 'react-redux'

import { setStartTour } from '@/redux/slices/tour'
import { useSelector } from '@/redux/store'
import { useTranslate } from '@root/src/utils/translateHelper'

import TooltipTourCodePanel from '../tour-tooltip'

import { getIntroMainSteps } from './config'

const STATUSES: string[] = [STATUS.FINISHED, STATUS.PAUSED, STATUS.SKIPPED]

export const MainPageTour = () => {
  const translate = useTranslate()
  const dispatch = useDispatch()

  const [slideIndex, setSlideIndex] = useState(0)

  const isReadyToStart = useSelector((state) => state.tour.readyToStartMainTour)
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
    const hasSeenTour = localStorage.getItem('HAS_SEEN_MAIN_TOUR')

    if (hasSeenTour || !isReadyToStart) {
      return
    }

    const timeout = setTimeout(() => {
      dispatch(setStartTour(true))
      localStorage.setItem('HAS_SEEN_MAIN_TOUR', 'true')
    }, 1000)
    return () => {
      clearTimeout(timeout)
    }
  }, [isTourStarted, isReadyToStart, dispatch])

  return (
    <JoyRide
      callback={handleJoyrideCallback}
      run={isTourStarted}
      tooltipComponent={TooltipTourCodePanel}
      steps={getIntroMainSteps(translate)}
      showSkipButton={false}
      showProgress
      stepIndex={slideIndex}
      styles={JOY_RIDE_OPTIONS}
    />
  )
}

const JOY_RIDE_OPTIONS = { options: { zIndex: 10000 } }

export default MainPageTour
