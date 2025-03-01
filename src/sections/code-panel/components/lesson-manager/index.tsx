import { type FC } from 'react'

import { STUDENT_PATH_DASHBOARD } from '@/routes/student.paths'

import { useLessonManager } from '../../lib/LessonManagerContext'

import LessonItem from './lesson-item'
import LessonManagerButton from './lesson-manager-button'
import LessonManagerSideBar from './lesson-manger-side-bar'
import SkeletonDrawer from './skeleton-drawer'

interface LessonManagerProps {
  iconColor?: string
}

const LessonManager: FC<LessonManagerProps> = ({ iconColor }) => {
  const { lesson, isLoading, isOpenDrawer, setIsOpenDrawer, data, onChooseLesson } =
    useLessonManager()

  return (
    <>
      <LessonManagerButton
        iconColor={iconColor}
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
