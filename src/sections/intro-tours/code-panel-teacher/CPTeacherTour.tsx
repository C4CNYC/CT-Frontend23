import { useEffect, useState } from 'react'

import { differenceInSeconds } from 'date-fns'
import JoyRide, { ACTIONS, type CallBackProps, EVENTS, STATUS } from 'react-joyride'
import { useDispatch } from 'react-redux'

import useIsDesktop from '@/hooks/useIsDesktop'
import { useProfileQuery } from '@/redux/services/auth'
import { setStartTour } from '@/redux/slices/tour'
import { useSelector } from '@/redux/store'
import { useUpdateMeMetaFlagMutation } from '@root/src/redux/services/auth'
import { useTranslate } from '@root/src/utils/translateHelper'

import { getTourStepsDesktop, getTourStepsMobile } from './CPTeacherTourConfig'
import { CPTeacherTourToolTip } from './CPTeacherTourToolTip'

const MS_IN_SECOND = 2592000
const STATUSES: string[] = [STATUS.FINISHED, STATUS.PAUSED, STATUS.SKIPPED]
const KEY_INTRO_TOUR = 'HAS_SEEN_TEACHER_TOUR'

export function CPTeacherTour() {
  const translate = useTranslate()
  const dispatch = useDispatch()
  const isDesktop = useIsDesktop()

  const [slideIndex, setSlideIndex] = useState(0)

  const isTourStarted = useSelector((state) => state.tour.isStarted)
  const userCreated = useSelector((state) => state.global.user?.createdAt)
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

    if (userCreated) {
      const isTourShouldBeStopped =
        differenceInSeconds(new Date(), new Date(userCreated)) / MS_IN_SECOND > 1

      if (isTourShouldBeStopped) {
        dispatch(setStartTour(false))
      }
    }

    const timeout = setTimeout(() => {
      dispatch(setStartTour(true))
      updateMeMetaFlag({ key: KEY_INTRO_TOUR, value: true })
        .unwrap()
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error('Failed to update meta flag:', error)
        })
    }, 3000)

    return () => {
      clearTimeout(timeout)
    }
  }, [userCreated, isTourStarted, dispatch, isLoading])

  return (
    <JoyRide
      callback={handleJoyrideCallback}
      run={isTourStarted}
      tooltipComponent={CPTeacherTourToolTip}
      steps={isDesktop ? getTourStepsDesktop(translate) : getTourStepsMobile(translate)}
      showSkipButton={false}
      showProgress
      stepIndex={slideIndex}
      styles={{ options: { zIndex: 10000 } }}
    />
  )
}
