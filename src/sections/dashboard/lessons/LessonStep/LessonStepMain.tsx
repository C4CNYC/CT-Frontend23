import { useEffect, useState } from 'react'

import { Box, Dialog } from '@mui/material'
import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'

import { ResizerUi } from '@/components'

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
        onClose={() => {}}
        PaperProps={{ sx: { height: '100vh' } }}
        fullScreen
      >
        <FullScreen handle={handle}>
          <LessonTopBar />

          <Box>
            <ResizerUi
              split='vertical'
              minSize={300}
              maxSize={750}
              defaultSize={'400px'}
            >
              <LessonStepList lessonId={lessonId as string} />
              {stepId ? <StepContentEditor /> : <NoSelectedStep />}
            </ResizerUi>
          </Box>
        </FullScreen>
      </Dialog>
    </LessonContentContext.Provider>
  )
}
