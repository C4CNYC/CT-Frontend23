import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'

import { useAuthContext } from '@root/src/auth/useAuthContext'
import { useN8nRequest } from '@root/src/redux/services/manager/ai-services'
import {
  useGetLessonContentQuery,
  useUpdateLessonContentMutation,
} from '@root/src/redux/services/manager/lesson-content-manager'
import { useLazyGetLessonContentStudentQuery } from '@root/src/redux/services/manager/lesson-student'
import { setChatVisible } from '@root/src/redux/slices/chat-handler'
import { dispatch, useSelector } from '@root/src/redux/store'
import { useLessonManager } from '@root/src/sections/code-panel/lib/LessonManagerContext'

import { IChatMessages } from '../chatInterface'

import { ChatAiOptionsType } from './ChatConstants'

export const ChatAi = () => {
  const [lastExtraSlideTime, setLastExtraSlideTime] = useState<number | null>(null)
  const MaxRefetchSeconds = 10
  const { user } = useAuthContext()
  const { lesson, lessonContent, updateSlideBody, setLessonContent } = useLessonManager()
  const [updateLessonContent] = useUpdateLessonContentMutation()
  // this useGetLessonContentQuery different from useGetLessonContentStudentQuery
  const lessonContenter = useGetLessonContentQuery(
    { lessonId: lesson?.id || '' },
    { skip: !lesson?.id }
  )
  const lessonContentGetter = useLazyGetLessonContentStudentQuery()
  const isChatVisible = useSelector((state) => state.chatHandler.isChatVisible)
  let userIsOwner = lesson?.userId == user?.id
  let minsSinceLesson = Math.floor((Date.now() - Date.parse(lesson?.createdAt || '')) / 60000)
  const [chatAiOptions, setChatAiOptions] = useState<ChatAiOptionsType[]>([])
  const { slideId } = useSelector((state) => ({
    slideId: state.codePanelGlobal.slideId,
    // lessonId: state.codePanelGlobal.lessonId, not working
  }))
  useEffect(() => {
    if (!userIsOwner || !lesson || minsSinceLesson > 60) return
    let lessonContentRefreshInterval = setInterval(() => {
      const secondsSinceLastExtra = lastExtraSlideTime
        ? (Date.now() - lastExtraSlideTime) / 1000
        : Infinity

      if (secondsSinceLastExtra >= MaxRefetchSeconds) lessonContenter.refetch()
    }, 1000 * 1)
    return () => {
      clearInterval(lessonContentRefreshInterval)
    }
  }, [lessonContenter, lesson, userIsOwner])
  useEffect(() => {
    if ((lessonContent?.length || 0) < (lessonContenter.data?.length || 0)) {
      setLastExtraSlideTime(Date.now())
      setLessonContent((prevContent) => [
        ...prevContent,
        ...(lessonContenter.data?.filter(
          (newItem) => !prevContent.some((item) => item.id === newItem.id)
        ) || []),
      ])
    }
  }, [lessonContenter.data])
  const actions: Record<string, (K?: any) => ChatAiOptionsType> = useMemo(
    () => ({
      slideSave: (body: string) => ({
        type: 'slide',
        action: 'Save',
        shortTitle: 'Save',
        description: 'Save Changes by Ai',
        onAction: () => {
          updateLessonContent({ lessonId: lesson?.id || '', body, id: slideId })
        },
      }),
      slideDiscard: () => ({
        type: 'slide',
        action: 'Discard',
        shortTitle: 'Discard',
        description: '',
        onAction: () => {
          lessonContenter.refetch()
        },
      }),
    }),
    [lessonContent, slideId]
  )
  useEffect(() => {
    if (userIsOwner) dispatch(setChatVisible(true))
  }, [userIsOwner])
  const ask = useN8nRequest()
  const askSuggestions = (slideId: string) =>
    ask(
      JSON.stringify({
        options: actions,
        slide: lessonContent?.find((c) => c.id === slideId),
        lesson: {
          id: lesson?.id,
          meta: lesson?.meta,
          name: lesson?.name,
          description: lesson?.description,
        },
      }),
      'slideSuggestions'
    )
  const modifySlide = (slideId: string, action: any) =>
    ask(
      JSON.stringify({
        options: actions,
        slide: lessonContent?.find((c) => c.id === slideId),
        lesson: {
          id: lesson?.id,
          meta: lesson?.meta,
          name: lesson?.name,
          description: lesson?.description,
        },
        action,
      }),
      'modifySlide'
    ) as unknown as Promise<{ data: [{ output: string }] }>
  const translateHuman4Us = (slideId: string, message: any) =>
    ask(JSON.stringify({ lessonId: lesson?.id, chat: message }), 'translateHuman4Us')
  const chatHistoryGet = () =>
    ask(JSON.stringify({ lessonId: lesson?.id }), 'chatHistoryGet').then((res) => {
      return 'data' in res ? (res.data as unknown as IChatMessages[]) : []
    })
  const chatHistoryAdd = (message: string, isMe = 0) =>
    ask(
      JSON.stringify({
        lessonId: lesson?.id,
        chat: message,
        isMe,
      }),
      'chatHistoryAdd'
    )
  const sendMessage =
    (setMessages: Dispatch<SetStateAction<IChatMessages[]>>) => (message: string) => {
      let ctime = new Date().getTime()
      setMessages((s) => [{ chat: message, isMe: true, id: ctime, ctime }, ...s])
      chatHistoryAdd(message, 1)
      modifySlide(slideId, message).then((res) => {
        ctime = new Date().getTime()
        let responseMessage = 'Making changes...'
        let aiResponse = ''
        let errorOccured = false
        try {
          JSON.parse(res.data[0].output)
          aiResponse = res.data[0].output
          updateSlideBody(slideId, res.data[0].output)
        } catch (e) {
          errorOccured = true
          // console.error('Error parsing response', e)
          if (e instanceof Error) {
            responseMessage = e.message
          } else {
            responseMessage = 'I didnt understand ai response'
          }
        }
        chatHistoryAdd(responseMessage, 0)
        if (!errorOccured)
          setMessages((s) => [
            {
              chat: responseMessage,
              isMe: false,
              id: ctime,
              ctime,
              options: [actions.slideSave(aiResponse), actions.slideDiscard()],
            },
            ...s,
          ])
      })
    }

  useEffect(() => {
    if (!slideId) return
    askSuggestions(slideId).then((res: any) => {
      if (res && 'data' in res && res.data && res.data.length > 0 && res.data[0].output) {
        setChatAiOptions(res.data[0].output as unknown as ChatAiOptionsType[])
      } else {
        setChatAiOptions([])
      }
    })
  }, [slideId])

  return {
    /* functions */
    chatHistoryGet,
    chatHistoryAdd,
    translateHuman4Us,
    askSuggestions,
    sendMessage,
    modifySlide,

    /* variables */
    userIsOwner,
    chatAiOptions,
  }
}
