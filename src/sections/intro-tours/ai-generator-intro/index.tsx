import { useEffect, useState } from 'react'

import { differenceInSeconds } from 'date-fns'
import JoyRide, { ACTIONS, type CallBackProps, EVENTS, STATUS } from 'react-joyride'
import { useDispatch } from 'react-redux'

import useIsDesktop from '@/hooks/useIsDesktop'
import { setStartTour } from '@/redux/slices/tour'
import { useSelector } from '@/redux/store'

import CopyLinkModal from '../../code-panel/components/modals/CopyLinkModal'
import WelcomeCodePanelModal from '../../code-panel/components/modals/WelcomeCodePanelModal'
import TooltipTourCodePanel from '../tour-tooltip'

import { AI_GENERATOR_TOUR_DECKTOP, AI_GENERATOR_TOUR_MOBILE } from './config'

const MS_IN_SECOND = 2592000
const STATUSES: string[] = [STATUS.FINISHED, STATUS.PAUSED, STATUS.SKIPPED]

interface AIGeneratorTourProps {
  withModals: boolean
}

export const AIGeneratorTour = ({ withModals }: AIGeneratorTourProps) => {
  const dispatch = useDispatch()
  const isDesktop = useIsDesktop()
  const [slideIndex, setSlideIndex] = useState(0)
  const [isReadyForModals, setIsReadyForModals] = useState(false)
  const isTourStarted = useSelector((state) => state.tour.isStarted)
  const userCreated = useSelector((state) => state.global.user?.createdAt)

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { action, index, status, type } = data
    if (STATUSES.includes(status as string) && isTourStarted) {
      dispatch(setStartTour(false))
      setIsReadyForModals(true)
      setSlideIndex(0)
    } else if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
      setSlideIndex(Number(index) + Number(action === ACTIONS.PREV ? -1 : 1))
    }
  }

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('HAS_SEEN_AI_GENERATOR_TOUR')

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
      localStorage.setItem('HAS_SEEN_AI_GENERATOR_TOUR', 'true')
    }, 1000)

    return () => {
      clearTimeout(timeout)
    }
  }, [userCreated, isTourStarted, dispatch])

  return (
    <>
      <JoyRide
        callback={handleJoyrideCallback}
        run={isTourStarted}
        tooltipComponent={TooltipTourCodePanel}
        steps={isDesktop ? AI_GENERATOR_TOUR_DECKTOP : AI_GENERATOR_TOUR_MOBILE}
        showSkipButton={false}
        showProgress
        stepIndex={slideIndex}
        styles={JOY_RIDE_OPTIONS}
      />
      {withModals && isReadyForModals ? (
        <>
          <WelcomeCodePanelModal />
          <CopyLinkModal />
        </>
      ) : null}
    </>
  )
}

const JOY_RIDE_OPTIONS = { options: { zIndex: 10000 } }

export default AIGeneratorTour
