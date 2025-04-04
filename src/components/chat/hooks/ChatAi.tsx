import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { useAuthContext } from '@root/src/auth/useAuthContext'
import { useN8nRequest } from '@root/src/redux/services/manager/ai-services'
import { useSelector } from '@root/src/redux/store'
import { useLessonManager } from '@root/src/sections/code-panel/lib/LessonManagerContext'

import { IChatMessages } from '../chatInterface'

import { actions, ChatAiOptionsType } from './ChatConstants'

export const ChatAi = () => {
  const { user } = useAuthContext()
  const { lesson, lessonContent, updateSlideBody } = useLessonManager()
  let userIsOwner = lesson?.userId == user?.id

  const [chatAiOptions, setChatAiOptions] = useState<ChatAiOptionsType[]>([])
  const { slideId } = useSelector((state) => ({
    slideId: state.codePanelGlobal.slideId,
    // lessonId: state.codePanelGlobal.lessonId, not working
  }))

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
    ) as unknown as Promise<{data: [{ output: string }]}>
  const translateHuman4Us = (slideId: string, message: any) =>
    ask(JSON.stringify({ lessonId: lesson?.id, chat: message }), 'translateHuman4Us')
  const chatHistoryGet = () =>
    ask(JSON.stringify({ lessonId: lesson?.id }), 'chatHistoryGet').then((res) => {
      return 'data' in res ? (res.data as unknown as IChatMessages[]) : []
    })
  const chatHistoryAdd=(message: string, isMe=0) =>
    ask(
      JSON.stringify({
        lessonId: lesson?.id,
        chat: ` I'm preparing your lesson `,
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
        try {
          JSON.parse(res.data[0].output)
          updateSlideBody(slideId, res.data[0].output)
        } catch (e) {
          // console.error('Error parsing response', e)
          if (e instanceof Error) {
            responseMessage = e.message
          } else {
            responseMessage = 'I didnt understand ai response'
          }
        }
        chatHistoryAdd(responseMessage, 0)
        setMessages((s) => [{ chat: responseMessage, isMe: false, id: ctime, ctime }, ...s])
      })
    }

  useEffect(() => {
    askSuggestions(slideId).then((res) =>
      'data' in res ? setChatAiOptions(res?.data as unknown as ChatAiOptionsType[]) : null
    )
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
