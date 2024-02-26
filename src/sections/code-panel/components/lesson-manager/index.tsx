import { type FC, useState } from 'react'

import { type IChallenges } from '@/redux/interfaces/challenges.interface'
import { type ILesson } from '@/redux/interfaces/content.interface'
import { STUDENT_PATH_DASHBOARD } from '@/routes/student.paths'
import { type BaseResponseInterface } from '@/utils'

import LessonItem from './lesson-item'
import LessonManagerButton from './lesson-manager-button'
import LessonManagerSideBar from './lesson-manger-side-bar'
import SkeletonDrawer from './skeleton-drawer'

export interface LessonManagerProps {
  lesson?: ILesson & BaseResponseInterface
  data?: IChallenges & BaseResponseInterface
  isLoading: boolean
  onChooseLesson: (lessonId: string, moduleId: string) => void
}

const LessonManager: FC<LessonManagerProps> = ({ lesson, onChooseLesson, isLoading, data }) => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)

  return (
    <>
      <LessonManagerButton
        onOpen={() => {
          setIsOpenDrawer(true)
        }}
        lesson={lesson}
      />

      <LessonManagerSideBar
        onClose={() => {
          setIsOpenDrawer(false)
        }}
        isOpen={isOpenDrawer}
        linkHref={STUDENT_PATH_DASHBOARD.courses.root}
      >
        {isLoading ? (
          <SkeletonDrawer />
        ) : (
          data?.units.map((module) => (
            <LessonItem
              key={module.id}
              module={module}
              onClick={onChooseLesson}
              onClose={() => {
                setIsOpenDrawer(false)
              }}
            />
          ))
        )}
      </LessonManagerSideBar>
    </>
  )
}

export default LessonManager
