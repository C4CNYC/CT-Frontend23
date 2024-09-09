import { useState } from 'react'

import { Stack } from '@mui/material'

import { RegisterStudenTeacher } from '../links'

import AIGenerateStepper from './ai-generete-stepper'
import { StyledContentTeacher } from './constants'
import LaunchCourseStepper from './launch-course-stepper'
import WelcomeStep from './WelcomeStep'

enum TEACHER_REGISTE_ENUM {
  launchCourse = 'COURSE',
  aiGenerate = 'AIGENERATE',
}

export default function TeacherStepper(): React.ReactElement {
  const [actitiveRoad, setActiveRoad] = useState<TEACHER_REGISTE_ENUM | null>(null)

  const selectLaunchCourse = () => setActiveRoad(TEACHER_REGISTE_ENUM.launchCourse)
  const selectAIGenerate = () => setActiveRoad(TEACHER_REGISTE_ENUM.aiGenerate)
  const resetRoad = () => setActiveRoad(null)
  return (
    <StyledContentTeacher isAigenerated={actitiveRoad === TEACHER_REGISTE_ENUM.aiGenerate}>
      <Stack
        sx={{
          width: '100%',
          minHeight: '460px',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {actitiveRoad === TEACHER_REGISTE_ENUM.launchCourse && <RegisterStudenTeacher isTeacher />}
        {!actitiveRoad && (
          <WelcomeStep
            selectLaunchCourse={selectLaunchCourse}
            selectAIGenerate={selectAIGenerate}
          />
        )}
        {actitiveRoad ? (
          actitiveRoad === TEACHER_REGISTE_ENUM.launchCourse ? (
            <LaunchCourseStepper resetRoad={resetRoad} />
          ) : (
            <AIGenerateStepper resetRoad={resetRoad} />
          )
        ) : null}
      </Stack>
    </StyledContentTeacher>
  )
}
