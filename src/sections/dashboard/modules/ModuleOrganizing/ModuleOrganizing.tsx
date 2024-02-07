import { useRouter } from 'next/router'

import { FullScreen, useFullScreenHandle } from 'react-full-screen'

import { Box, Dialog } from '@mui/material'

import LessonDetails from './LessonDetails'
import ModuleLessonList from './ModuleLessonList'
import LessonTopBar from '../../lessons/LessonStep/lesson-top-bar/LessonTopBar'
import { NoSelectedLesson } from './NoSelectedLesson'
import { useAtom } from 'jotai'
import { lessonViewAtom } from '../../lessons/LessonStep/lesson-atoms/lesson-view-atom'
import { useEffect } from 'react'

export default function ModuleOrganizing(): React.ReactElement {
  const router = useRouter()
  const { lessonId, moduleId } = router.query
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
        open={Boolean(moduleId)}
        onClose={() => {}}
        PaperProps={{ sx: { height: '100vh' } }}
        fullScreen
      >
        <FullScreen handle={handle}>
          <LessonTopBar />

          <Box sx={{ display: 'flex', gap: 2, p: 2 }}>
            <ModuleLessonList moduleId={moduleId as string} />
            {lessonId ? <LessonDetails /> : <NoSelectedLesson />}
          </Box>
        </FullScreen>
      </Dialog>
    </>
  )
}
