import { useEffect, useState } from 'react'

import { Dialog } from '@mui/material'
import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'

import { ResizerUi } from '@root/src/components/resizer/Resizer'
import LessonCreationIntro from '@root/src/sections/intro-tours/lesson-creation-intro'

import { lessonViewAtom } from './lesson-atoms/lesson-view-atom'
import LessonTopBar from './lesson-top-bar/LessonTopBar'
import { LessonContentContext } from './LessonStepContent/LessonContent.context'
import StepContentEditor from './LessonStepContent/StepContentEditor'
import LessonStepList from './LessonStepList'
import { NoSelectedStep } from './NoSelectedStep'

export default function LessonStepMain(): React.ReactElement {
  const router = useRouter()
  const { stepId, lessonId } = router.query
  const [, setLessonView] = useAtom(lessonViewAtom)
  const handle = useFullScreenHandle()
  const [locked, setLocked] = useState(false)

  useEffect(() => {
    setLessonView((prev) => ({
      ...prev,
      isFullScreenView: handle.active,
      unitId: router.query.unit_id as string,
    }))
  }, [handle.active])
  useEffect(() => {
    setLessonView((prev) => ({
      ...prev,
      fullScreenOpen: handle.enter,
      fullScreenClose: handle.exit,
    }))
  }, [])
  if (!Boolean(lessonId)) return <> </>
  return (
    <LessonContentContext.Provider
      value={{
        locked,
        lockedHandler: setLocked,
      }}
    >
      <style>
        {`
        .fullscreen-enabled {
          background: #fff;
        }
      `}
      </style>

      <Dialog
        open={Boolean(lessonId)}
        onClose={() => {
          router.push(`${router.pathname}?lessonId=`, undefined, { shallow: true })
        }}
        fullScreen
      >
        <FullScreen handle={handle}>
          <LessonTopBar />

          {stepId && <LessonCreationIntro delay={1000} />}
          <ResizerUi
            split='vertical'
            minSize={300}
            maxSize={750}
            defaultSize={'400px'}
            style={{ height: 'calc(100% - 48px)' }}
          >
            <LessonStepList lessonId={lessonId as string} />
            {stepId ? <StepContentEditor /> : <NoSelectedStep />}
          </ResizerUi>
        </FullScreen>
      </Dialog>
    </LessonContentContext.Provider>
  )
}
