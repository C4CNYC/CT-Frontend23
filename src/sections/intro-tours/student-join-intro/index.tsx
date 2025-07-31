import { useEffect, useState } from 'react'

import JoyRide, { ACTIONS, type CallBackProps, EVENTS, STATUS } from 'react-joyride'
import { useDispatch } from 'react-redux'

import { useProfileQuery } from '@/redux/services/auth'
import { setStartTour } from '@/redux/slices/tour'
import { useSelector } from '@/redux/store'
import { useUpdateMeMetaFlagMutation } from '@root/src/redux/services/auth'
import { useTranslate } from '@root/src/utils/translateHelper'

import TooltipTourCodePanel from '../tour-tooltip'

import { getIntroStudentJoinSteps } from './config'

const STATUSES: string[] = [STATUS.FINISHED, STATUS.PAUSED, STATUS.SKIPPED]
const KEY_INTRO_TOUR = 'HAS_SEEN_STUDENT_JOIN_INTRO'

export const StudentJoinIntro = () => {
  const translate = useTranslate()
  const dispatch = useDispatch()

  const [slideIndex, setSlideIndex] = useState(0)
  const isTourStarted = useSelector((state) => state.tour.isStarted)
  const profile = useSelector((state) => state.global.user)
  const { data: userData, isLoading } = useProfileQuery(null as unknown as void, { skip: !profile })
  const [updateMeMetaFlag] = useUpdateMeMetaFlagMutation()

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
    if (isLoading) return

    const hasSeenTour = userData?.meta ? userData.meta[KEY_INTRO_TOUR] : false

    if (hasSeenTour) {
      return
    }

    const timeout = setTimeout(() => {
      dispatch(setStartTour(true))
      updateMeMetaFlag({ key: KEY_INTRO_TOUR, value: true })
        .unwrap()
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error('Failed to update meta flag:', error)
        })
    }, 1000)
    return () => {
      clearTimeout(timeout)
    }
  }, [isTourStarted, dispatch, isLoading])

  return (
    <JoyRide
      callback={handleJoyrideCallback}
      run={isTourStarted}
      tooltipComponent={TooltipTourCodePanel}
      steps={getIntroStudentJoinSteps(translate)}
      showSkipButton={false}
      showProgress
      stepIndex={slideIndex}
      styles={JOY_RIDE_OPTIONS}
    />
  )
}

const JOY_RIDE_OPTIONS = { options: { zIndex: 10000 } }

export default StudentJoinIntro
