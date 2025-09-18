import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { type IChallenges } from '@/redux/interfaces/challenges.interface'
import { ILessonContent, type ILesson } from '@/redux/interfaces/content.interface'
import { type BaseResponseInterface } from '@/utils'
import { useSnackbar } from '@root/src/components/snackbar'
import { useBoolean } from '@root/src/hooks/use-boolean'
import { useUpdateLessonContentMutation } from '@root/src/redux/services/manager/lesson-content-manager'
import { useSelector } from '@root/src/redux/store'
import { STUDENT_PATH_DASHBOARD } from '@root/src/routes/student.paths'

import { resetLessonEvent } from './events'

interface LessonManagerContextProps {
  lesson?: ILesson & BaseResponseInterface
  lessonContent?: ILessonContent[]
  data?: IChallenges & BaseResponseInterface
  isLoading: boolean
  isOpenDrawer: boolean
  userIsOwner: boolean
  slidesUpdated: string[]
  currentSlideUpdated: boolean
  currentSlideId: string
  setIsOpenDrawer: (isOpen: boolean) => void
  onChooseLesson: (lessonId: string, unitId: string) => void
  updateSlide: (
    slideId: string,
    part: keyof ILessonContent,
    value: ILessonContent[keyof ILessonContent]
  ) => void
  addNewSlide: (newSlide: ILessonContent & BaseResponseInterface) => void
  setLessonContent: Dispatch<SetStateAction<(ILessonContent & BaseResponseInterface)[]>>
  saveSlideDB: () => void
}

const LessonManagerContext = createContext<LessonManagerContextProps | undefined>(undefined)

export const LessonManagerProvider: React.FC<{
  children: React.ReactNode
  lesson?: ILesson & BaseResponseInterface
  lessonContent?: (ILessonContent & BaseResponseInterface)[]
  data?: IChallenges & BaseResponseInterface
  isLoading: boolean
}> = ({ children, lesson, lessonContent: initialLessonContent, data, isLoading }) => {
  const { enqueueSnackbar } = useSnackbar()
  const [updateLessonContent] = useUpdateLessonContentMutation()
  const slideId = useSelector((state) => state.codePanelGlobal.slideId)
  const [lessonContent, setLessonContent] = useState<(ILessonContent & BaseResponseInterface)[]>([])
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const [slidesUpdated, setSlidesUpdated] = useState<string[]>([])
  const {
    value: contentEditing,
    onTrue: contentEditingOn,
    onFalse: contentEditingOff,
  } = useBoolean(false)
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
  }, [initialLessonContent])

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

  function saveSlideDB() {
    let currentSlide = lessonContent.find((s) => s.id === slideId)
    if (!currentSlide) return
    updateLessonContent({
      lessonId: lesson?.id || '',
      id: currentSlide.id,
      body: currentSlide.body,
    })
      .then(() => {
        enqueueSnackbar('Slide updated successfully', { variant: 'success' })
        setSlidesUpdated((prev) => prev.filter((s) => s !== slideId))
      })
      .catch((error) => {
        enqueueSnackbar('Error updating slide', { variant: 'error' })
      })
  }

  return (
    <LessonManagerContext.Provider
      value={{
        lesson,
        lessonContent,
        data,
        isLoading,
        isOpenDrawer,
        slidesUpdated,
        userIsOwner,
        currentSlideUpdated: slidesUpdated.some((s) => s === slideId),
        currentSlideId: slideId,

        setIsOpenDrawer,
        onChooseLesson,
        updateSlide,
        addNewSlide,
        setLessonContent,
        saveSlideDB,
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
