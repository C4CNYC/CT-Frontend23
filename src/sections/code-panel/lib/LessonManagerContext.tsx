import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { type IChallenges } from '@/redux/interfaces/challenges.interface'
import { ILessonContent, type ILesson } from '@/redux/interfaces/content.interface'
import { type BaseResponseInterface } from '@/utils'
import { STUDENT_PATH_DASHBOARD } from '@root/src/routes/student.paths'

import { resetLessonEvent } from './events'

interface LessonManagerContextProps {
  lesson?: ILesson & BaseResponseInterface
  lessonContent?: ILessonContent[]
  data?: IChallenges & BaseResponseInterface
  isLoading: boolean
  isOpenDrawer: boolean
  setIsOpenDrawer: (isOpen: boolean) => void
  onChooseLesson: (lessonId: string, unitId: string) => void
  updateSlide: (
    slideId: string,
    part: keyof ILessonContent,
    value: ILessonContent[keyof ILessonContent]
  ) => void
  addNewSlide: (newSlide: ILessonContent & BaseResponseInterface) => void
  setLessonContent: Dispatch<SetStateAction<(ILessonContent & BaseResponseInterface)[]>>
}

const LessonManagerContext = createContext<LessonManagerContextProps | undefined>(undefined)

export const LessonManagerProvider: React.FC<{
  children: React.ReactNode
  lesson?: ILesson & BaseResponseInterface
  lessonContent?: (ILessonContent & BaseResponseInterface)[]
  data?: IChallenges & BaseResponseInterface
  isLoading: boolean
}> = ({ children, lesson, lessonContent: initialLessonContent, data, isLoading }) => {
  const [lessonContent, setLessonContent] = useState(initialLessonContent || [])
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (initialLessonContent) {
      setLessonContent(initialLessonContent)
    }
  }, [initialLessonContent])
  const updateSlide = (
    slideId: string,
    part: keyof ILessonContent,
    value: ILessonContent[keyof ILessonContent]
  ) => {
    setLessonContent((prev) =>
      prev.map((slide) => (slide.id === slideId ? { ...slide, [part]: value } : slide))
    )
  }

  const addNewSlide = (newSlide: ILessonContent & BaseResponseInterface) => {
    setLessonContent((prev) => {
      const updatedContent = [...prev]
      const SlideIndex = updatedContent.findIndex((slide) => slide.meta.order > newSlide.meta.order)
      const insertIndex = SlideIndex === -1 ? prev.length : SlideIndex
      updatedContent.splice(insertIndex, 0, newSlide)
      return updatedContent
    })
  }
  const onOpenLesson = (lessonId: string, unitId: string): void => {
    if (!router.query.courseId && !unitId) return

    void router.push(
      STUDENT_PATH_DASHBOARD.codePanel.workSpace({
        courseId: router.query.courseId as string,
        unitId,
        lessonId,
      })
    )
  }

  const onChooseLesson = (lessonId: string, unitId: string) => {
    if (router.query.lessonId === lessonId) return

    window.dispatchEvent(resetLessonEvent)
    onOpenLesson(lessonId, unitId)
  }

  return (
    <LessonManagerContext.Provider
      value={{
        lesson,
        lessonContent,
        data,
        isLoading,
        isOpenDrawer,
        setIsOpenDrawer,
        onChooseLesson,
        updateSlide,
        addNewSlide,
        setLessonContent,
      }}
    >
      {children}
    </LessonManagerContext.Provider>
  )
}

export const useLessonManager = () => {
  const context = useContext(LessonManagerContext)
  if (!context) {
    throw new Error('useLessonManager must be used within a LessonManagerProvider')
  }
  return context
}
