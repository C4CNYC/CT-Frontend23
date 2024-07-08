import { useEffect } from 'react'

import { Box, Dialog } from '@mui/material'
import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'

import { Panel, PanelGroup, PanelResizeHandle } from '@root/src/components/resizer/Resizer'

import { lessonViewAtom } from './lesson-atoms/lesson-view-atom'
import LessonTopBar from './lesson-top-bar/LessonTopBar'
import StepContentEditor from './LessonStepContent/StepContentEditor'
import LessonStepList from './LessonStepList'
import { NoSelectedStep } from './NoSelectedStep'

export default function LessonStepMain(): React.ReactElement {
  const router = useRouter()
  const { stepId, lessonId } = router.query
  const [, setLessonView] = useAtom(lessonViewAtom)
  const handle = useFullScreenHandle()

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
    <>
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
            <PanelGroup
              style={{ position: 'absolute', height: 'calc(100vh - 48px)' }}
              autoSaveId='example'
              direction='horizontal'
            >
              <Panel
                style={{ overflowY: 'auto' }}
                defaultSize={20}
                minSize={20}
                maxSize={30}
              >
                <LessonStepList lessonId={lessonId as string} />
              </Panel>
              <PanelResizeHandle />
              <Panel minSize={40}>
                <Box marginTop={1}>{stepId ? <StepContentEditor /> : <NoSelectedStep />}</Box>
              </Panel>
            </PanelGroup>
          </Box>
        </FullScreen>
      </Dialog>
    </>
  )
}
