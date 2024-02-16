import { type FC, useState } from 'react'

import { type IChallanges } from '@/redux/interfaces/challenges.interface'
import { type ILesson } from '@/redux/interfaces/content.interface'
import { type BaseResponseInterface } from '@/utils'

import LessonItem from './lesson-item'
import LessonManagerButton from './lesson-manager-button'
import LessonManagerSideBar from './lesson-manger-side-bar'
import SkeletonDrawer from './skeleton-drawer'

export interface LessonManagerProps {
  lesson?: ILesson & BaseResponseInterface
  linkHref: string
  data?: IChallanges & BaseResponseInterface
  isLoading: boolean
  onChooseLesson: (lessonId: string, moduleId: string) => void
}

const LessonManager: FC<LessonManagerProps> = ({
  lesson,
  onChooseLesson,
  linkHref,
  isLoading,
  data,
}) => {
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
        linkHref={linkHref}
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
