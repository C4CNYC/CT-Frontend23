import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { ILessonContent, type ILesson } from '@/redux/interfaces/content.interface'
import { type BaseResponseInterface } from '@/utils'
import { useSnackbar } from '@root/src/components/snackbar'
import { useBoolean } from '@root/src/hooks/use-boolean'
import { useUpdateLessonContentMutation } from '@root/src/redux/services/manager/lesson-content-manager'
import { useSelector } from '@root/src/redux/store'
import { STUDENT_PATH_DASHBOARD } from '@root/src/routes/student.paths'

import { resetLessonEvent } from '../code-panel/lib/events/reset-lesson.event'

interface LessonManagerContextProps {
  lesson?: ILesson & BaseResponseInterface
  lessonContent?: ILessonContent[]
  isLoading: boolean
  isOpenDrawer: boolean
  userIsOwner: boolean
  slidesUpdated: string[]
  currentSlideUpdated: boolean
  currentSlideId: string
  checkersAnimation: ReturnType<typeof useBoolean>
  checkersAnimationNumber: number
  checkersAnimationNumberSet: (v: number) => void
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
  lesson: ILesson & BaseResponseInterface
  lessonContent: (ILessonContent & BaseResponseInterface)[]
  isLoading: boolean
}> = ({ children, lesson, lessonContent: initialLessonContent, isLoading }) => {
  const { enqueueSnackbar } = useSnackbar()
  const [updateLessonContent] = useUpdateLessonContentMutation()
  const checkersAnimation = useBoolean()
  const [checkersAnimationNumber, checkersAnimationNumberSet] = useState(1)
  const slideId = useSelector((state) => state.codePanelGlobal.slideId)
  const [lessonContent, setLessonContent] = useState<(ILessonContent & BaseResponseInterface)[]>([])
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const [slidesUpdated, setSlidesUpdated] = useState<string[]>([])
  const user = useSelector((state) => state.global.user)
  let userIsOwner = !!user?.id && lesson?.userId == user?.id
  const router = useRouter()

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'contentChange' && event.data?.content) {
        const content = event.data.content
        if (slideId && content) {
          updateSlide(slideId, 'body', JSON.stringify({ content }))
        }
      }
    }

    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [slideId])

  useEffect(() => {
    if (initialLessonContent) {
      setLessonContent(
        initialLessonContent.map((slide) => ({
          ...slide,
        }))
      )
    }
  }, [setLessonContent, initialLessonContent])
  const updateSlide = (
    slideId: string,
    part: keyof ILessonContent,
    value: ILessonContent[keyof ILessonContent]
  ) => {
    setLessonContent((prev) => {
      let el = prev.find((s) => s.id === slideId)
      if (!el || !(value !== undefined)) return prev
      // @ts-ignore

      el[part] = value

      return prev
    })
    setSlidesUpdated((prev) =>
      prev.find((slide) => slide === slideId) ? prev : [...prev, slideId]
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
        isLoading,
        isOpenDrawer,
        slidesUpdated,
        userIsOwner,
        currentSlideUpdated: slidesUpdated.some((s) => s === slideId),
        currentSlideId: slideId,
        checkersAnimation,
        checkersAnimationNumber,

        setIsOpenDrawer,
        onChooseLesson,
        updateSlide,
        addNewSlide,
        setLessonContent,
        checkersAnimationNumberSet,
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
