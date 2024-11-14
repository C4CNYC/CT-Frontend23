import {
  useGenerateLessonMutation,
  useGenerateLessonMultiMutation,
  useCreateLessonUsingOpenAIAssistantMutation,
  useCreateLessonUsingOpenAIAssistantBetaMutation,
} from '@root/src/redux/services/manager/lessons-manager'

import { ILessonGenerate } from '../redux/services/interfaces/courseUnits.interface'

export function AiGenerate(): [
  (lessonData: ILessonGenerate) => Promise<{ data: { id: string } }>,
  { isLoading: boolean },
] {
  const [generateLesson, { isLoading: generateLessonLoading }] = useGenerateLessonMutation()
  const [generateMultiLesson, { isLoading: generateMultiLessonLoading }] =
    useGenerateLessonMultiMutation()
  const [createLessonUsingOpenAIAssistant, { isLoading: createLessonUsingOpenAIAssistantLoading }] =
    useCreateLessonUsingOpenAIAssistantMutation()
  const [
    createLessonUsingOpenAIAssistantBeta,
    { isLoading: createLessonUsingOpenAIAssistantBetaLoading },
  ] = useCreateLessonUsingOpenAIAssistantBetaMutation()

  const createLesson = async (lessonData: ILessonGenerate) => {
    let newLesson
    switch (lessonData.lessonType) {
      case 'simple':
        newLesson = await generateLesson(lessonData)
        break
      case 'multi':
      case 'full':
      case 'exercises':
        newLesson = await generateMultiLesson(lessonData)
        break
      default:
      case 'project':
        newLesson = await createLessonUsingOpenAIAssistant({
          ...lessonData,
          lesson_id: lessonData.lessonType,
        })
        break
      case 'beta':
        // @ts-ignore
        newLesson = await createLessonUsingOpenAIAssistantBeta({
          ...lessonData,
        })
        break
    }
    if ('error' in newLesson) throw new Error((newLesson as any).error.data.message)
    return newLesson
  }
  return [
    createLesson,
    {
      isLoading:
        generateLessonLoading ||
        generateMultiLessonLoading ||
        createLessonUsingOpenAIAssistantLoading ||
        createLessonUsingOpenAIAssistantBetaLoading,
    },
  ]
}
