import { useEffect, useState } from 'react'

import { differenceInSeconds } from 'date-fns'
import JoyRide, { ACTIONS, type CallBackProps, EVENTS, STATUS } from 'react-joyride'
import { useDispatch } from 'react-redux'

import useIsDesktop from '@/hooks/useIsDesktop'
import { setStartTour } from '@/redux/slices/tour'
import { useSelector } from '@/redux/store'
import { useTranslate } from '@root/src/utils/translateHelper'

import TooltipTourCodePanel from '../tour-tooltip'

import { getTourStepsDesktop, getTourStepsMobile } from './config'

const MS_IN_SECOND = 2592000
const STATUSES: string[] = [STATUS.FINISHED, STATUS.PAUSED, STATUS.SKIPPED]

export const CodePanelTour = () => {
  const translate = useTranslate()
  const dispatch = useDispatch()
  const isDesktop = useIsDesktop()

  const [slideIndex, setSlideIndex] = useState(0)

  const isTourStarted = useSelector((state) => state.tour.isStarted)
  const userCreated = useSelector((state) => state.global.user?.createdAt)

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
    const hasSeenTour = localStorage.getItem('HAS_SEEN_TOUR')

    if (hasSeenTour) {
      return
    }

    if (userCreated) {
      const isTourShouldBeStopped =
        differenceInSeconds(new Date(), new Date(userCreated)) / MS_IN_SECOND > 1

      if (isTourShouldBeStopped) {
        dispatch(setStartTour(false))
      }
    }

    const timeout = setTimeout(() => {
      dispatch(setStartTour(true))
      localStorage.setItem('HAS_SEEN_TOUR', 'true')
    }, 3000)

    return () => {
      clearTimeout(timeout)
    }
  }, [userCreated, isTourStarted, dispatch])

  return (
    <JoyRide
      callback={handleJoyrideCallback}
      run={isTourStarted}
      tooltipComponent={TooltipTourCodePanel}
      steps={isDesktop ? getTourStepsDesktop(translate) : getTourStepsMobile(translate)}
      showSkipButton={false}
      showProgress
      stepIndex={slideIndex}
      styles={JOY_RIDE_OPTIONS}
    />
  )
}

const JOY_RIDE_OPTIONS = { options: { zIndex: 10000 } }

export default CodePanelTour
