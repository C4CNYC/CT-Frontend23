import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'

import { useAuthContext } from '@root/src/auth/useAuthContext'
import { LessonContentType } from '@root/src/redux/services/enums/lesson-content-type.enum'
import { useN8nRequest } from '@root/src/redux/services/manager/ai-services'
import {
  useGetLessonContentQuery,
  useGetLessonSlidePreloadFilesQuery,
  useRemoveLessonStepPreloadFileMutation,
  useUpdateLessonContentMutation,
} from '@root/src/redux/services/manager/lesson-content-manager'
import {
  useAddLessonStepPreloadFileMutation,
  useCreateLessonContentMutation,
} from '@root/src/redux/services/manager/lesson-content-manager'
import {
  useCreateLessonContentValidationManagerMutation,
  useGetLessonContentValidationsManagerQuery,
} from '@root/src/redux/services/manager/lesson-content-validation-manager'
import {
  useGetStudentFilesQuery,
  useResetStudentFiles,
} from '@root/src/redux/services/manager/workspace-student'
import { setChatVisible } from '@root/src/redux/slices/chat-handler'
import { dispatch, useSelector } from '@root/src/redux/store'
import { useLessonManager } from '@root/src/sections/code-panel/lib/LessonManagerContext'
import { FileExtensions } from '@root/src/types/lessons'
import { JsonParseFromAiResponse } from '@root/src/utils/stripQuotesFromAiResponse'

import { IChatMessages } from '../chatInterface'

import { ChatAiOptionsType } from './ChatConstants'

export const ChatAi = () => {
  const [lastExtraSlideTime, setLastExtraSlideTime] = useState<number | null>(null)
  const MaxRefetchSeconds = 10
  const { user } = useAuthContext()
  const [slideSugCache, slideSugCacheSet] = useState<Record<string, ChatAiOptionsType[]>>({})
  const { lesson, lessonContent, updateSlide, addNewSlide, setLessonContent } = useLessonManager()
  const [updateLessonContent] = useUpdateLessonContentMutation()
  const [addLessonContent] = useCreateLessonContentMutation()
  const [addLessonStepPreloadFile] = useAddLessonStepPreloadFileMutation()
  const [deleteLessonStepPreloadFile] = useRemoveLessonStepPreloadFileMutation()
  const lessonFiles = useGetLessonSlidePreloadFilesQuery(
    {
      lessonId: lesson?.id || '',
      contentId: lessonContent?.[0]?.id || '',
    },
    { skip: !lesson?.id || !lessonContent?.[0]?.id }
  )
  const lessonValidations = useGetLessonContentValidationsManagerQuery(
    { id: lesson?.id || '' },
    { skip: !lesson?.id }
  )
  const [validationUpdate] = useCreateLessonContentValidationManagerMutation()
  // this useGetLessonContentQuery different from useGetLessonContentStudentQuery
  const lessonContenter = useGetLessonContentQuery(
    { lessonId: lesson?.id || '' },
    { skip: !lesson?.id }
  )
  const userIsOwner = useMemo(() => lesson?.userId == user?.id, [lesson?.userId, user?.id])
  const minsSinceLesson = useMemo(
    () => Math.floor((Date.now() - Date.parse(lesson?.createdAt || '')) / 60000),
    [lesson?.createdAt]
  )
  const [chatAiOptions, setChatAiOptions] = useState<ChatAiOptionsType[]>([])
  const slideId = useSelector((state) => state.codePanelGlobal.slideId)
  const { refetch: refetchFiles, data: lessonContentFiles } = useGetStudentFilesQuery(
    { lessonId: lesson?.id || '', lessonContentId: slideId || '' },
    { skip: !lesson?.id || !slideId || !user?.id || !userIsOwner }
  )
  const deleteAllFiles = useResetStudentFiles({
    lessonId: lesson?.id || '',
    lessonContentId: lessonContent?.find((_c, i) => 0 === i)?.id || slideId || '',
  })

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
        ...(lessonContenter.data
          ?.filter((newItem) => !prevContent.some((item) => item.id === newItem.id))
          .map((item) => ({ ...item })) || []),
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
        code: lessonContentFiles?.find((f, i) => i == 0)?.body,
      }),
      'modifySlide'
    ) as unknown as Promise<{
      data: [
        {
          action: any
          output: string
        },
      ]
    }>
  const translateHuman4Us = (slideId: string, message: any) =>
    ask(JSON.stringify({ lessonId: lesson?.id, chat: message }), 'translateHuman4Us')
  const chatHistoryGet = (): Promise<IChatMessages[]> =>
    ask(JSON.stringify({ lessonId: lesson?.id }), 'chatHistoryGet').then((res: any) => {
      if ('data' in res && res.data && Array.isArray(res.data)) return res.data as IChatMessages[]
      return []
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

  // Process AI response based on action type
  const processAiResponse = async (action: string, aiResponse: string, message: string) => {
    switch (action) {
      case 'add':
        return await processAddAction(aiResponse, message)
      case 'regex':
        return await processRegexAction(aiResponse, message)
      case 'precode':
        return await processPreCodeAction(aiResponse)
      default:
        updateSlide(slideId, 'body', aiResponse)
        return false
    }
  }

  // Handle 'add' action - creates a new slide
  const processAddAction = async (aiResponse: string, message: string) => {
    const order = lessonContent?.findIndex((lc) => lc.id === slideId) || 0
    try {
      const newLessonContent = await addLessonContent({
        lessonId: lesson?.id || '',
        title: message,
        body: aiResponse,
        tips: '',
        type: LessonContentType.Editable,
        meta: { order: order + 0.1 },
      }).unwrap()

      addNewSlide({
        ...newLessonContent,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      return false
    } catch (e) {
      return true // error occurred
    }
  }

  // Handle 'regex' action - updates validation rules
  const processRegexAction = async (aiResponse: string, message: string) => {
    await validationUpdate({
      regex: JsonParseFromAiResponse(aiResponse).content,
      name: message,
      id: slideId,
    }).unwrap()
    lessonValidations.refetch()
    return false
  }

  // Handle 'precode' action - sets up preloaded code
  const processPreCodeAction = async (aiResponse: string) => {
    const firstSlide = lessonContent?.find((_c, i) => 0 === i)
    lessonFiles.data?.forEach((f) => {
      deleteLessonStepPreloadFile({
        lessonId: lesson?.id || '',
        contentId: firstSlide?.id || slideId,
        fileId: f.id,
      })
    })
    deleteAllFiles()
    await addLessonStepPreloadFile({
      lessonId: lesson?.id || '',
      contentId: firstSlide?.id || slideId,
      preloaded_code: JsonParseFromAiResponse(aiResponse).content,
      name: 'index',
      extension: FileExtensions.HTML,
    })
    refetchFiles()
    return false
  }

  const sendMessage =
    (
      setMessages: Dispatch<SetStateAction<IChatMessages[]>>,
      setIsLoading?: Dispatch<SetStateAction<boolean>>
    ) =>
    async (message: string) => {
      let ctime = new Date().getTime()
      setIsLoading?.(true)

      try {
        setMessages((s) => [{ chat: message, isMe: true, id: ctime, ctime }, ...(s || [])])
        await chatHistoryAdd(message, 1)

        const res = await modifySlide(slideId, message)
        ctime = new Date().getTime()

        let responseMessage = 'Making changes...'
        let aiResponse = ''
        let errorOccured = false

        try {
          JSON.parse(res.data[0].output)
          aiResponse = res.data[0].output
          errorOccured = await processAiResponse(res.data[0].action, aiResponse, message)
        } catch (e) {
          errorOccured = true
          if (e instanceof SyntaxError) {
            responseMessage = `I received an invalid response format. Let me try a different approach.`
          } else if (e instanceof Error) {
            responseMessage = `I encountered an issue: ${e.message}. Let me try again differently.`
          } else {
            responseMessage = 'I had trouble processing that request. Could you try rephrasing it?'
          }
        }

        await chatHistoryAdd(responseMessage, 0)
        if (!errorOccured) {
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
        }
      } catch (error) {
        setMessages((s) => [
          {
            chat: 'Sorry, I encountered an error processing your request. Please try again.',
            isMe: false,
            id: new Date().getTime(),
            ctime: new Date().getTime(),
          },
          ...s,
        ])
      } finally {
        setIsLoading?.(false)
      }
    }

  useEffect(() => {
    if (!userIsOwner || !slideId) return
    if (slideId in slideSugCache) return setChatAiOptions(slideSugCache[slideId])
    askSuggestions(slideId).then((res: any) => {
      if (
        res &&
        'data' in res &&
        res.data &&
        res.data.length > 0 &&
        res.data[0].output &&
        res.data[0].output?.length &&
        res.data[0].output.length > 0
      ) {
        setChatAiOptions(res.data[0].output as unknown as ChatAiOptionsType[])
        slideSugCacheSet((prev) => ({ ...prev, [slideId]: res.data[0].output }))
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
