import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

import { BaseListResponseInterface, BaseResponseInterface } from '@/utils'

import { AiLessonGenerate } from '../interfaces/ai.interface'
import {
  ILesson,
  ILessonCreate,
  ILessonDelete,
  ILessonSearchParams,
  ILessonUpdate,
  IOpenAiRequest,
  ILessonGenerate,
} from '../interfaces/courseUnits.interface'
import { IIntegration } from '../interfaces/integration.interface'

import { managerApi } from '.'

const extendedApi = managerApi.injectEndpoints({
  endpoints: (builder) => ({
    getLessons: builder.query<
      BaseListResponseInterface<ILesson & BaseResponseInterface>,
      ILessonSearchParams
    >({
      query: (params) => ({
        url: '/manager/lesson',
        method: 'GET',
        params,
      }),
      keepUnusedDataFor: 0,
      providesTags: ['Lessons'],
    }),
    getLessonsByIds: builder.query<ILesson[], string[]>({
      queryFn: async (lessonIds, _queryApi, _extraOptions, fetchWithBQ) => {
        try {
          const results = await Promise.all(
            lessonIds.map((id) => fetchWithBQ(`/public/lesson/${id}`))
          )
          // Aggregate and return the data
          const lessons = results.map((result) => result.data as ILesson).filter(Boolean)
          return { data: lessons }
        } catch (error) {
          return { error: error as FetchBaseQueryError }
        }
      },
    }),
    getOwnLessons: builder.query<
      BaseListResponseInterface<ILesson & BaseResponseInterface>,
      ILessonSearchParams
    >({
      query: (params) => ({
        url: '/manager/lesson/own',
        method: 'GET',
        params,
      }),
      keepUnusedDataFor: 0,
      providesTags: ['Lessons'],
    }),
    getLesson: builder.query<ILesson & BaseResponseInterface, { id: string }>({
      query: ({ id }) => ({
        url: `/manager/lesson/${id}`,
        method: 'GET',
      }),
      keepUnusedDataFor: 0,
      providesTags: ['Lessons'],
    }),
    updateLesson: builder.mutation<ILesson & BaseResponseInterface, ILessonUpdate>({
      query: ({ id, ...body }) => ({
        url: `/manager/lesson/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [{ type: 'Lessons' }],
    }),
    createLesson: builder.mutation<ILessonCreate & BaseResponseInterface, ILessonCreate>({
      query: ({ ...body }) => ({
        url: '/manager/lesson',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Lessons' }],
    }),
    cloneLesson: builder.mutation<ILesson & BaseResponseInterface, { lesson_id: string }>({
      query: ({ lesson_id }) => ({
        url: `/manager/lesson/clone/${lesson_id}`,
        method: 'POST',
      }),
      invalidatesTags: ['Lessons'],
    }),
    importLesson: builder.mutation<ILessonCreate & BaseResponseInterface, { file: File }>({
      query: ({ file }) => {
        const formData = new FormData()
        formData.append('file', file)
        return {
          url: '/manager/lesson-import-export/import',
          method: 'POST',
          body: formData,
        }
      },
      invalidatesTags: [{ type: 'Lessons' }],
    }),
    exportLesson: builder.mutation<
      { lesson: ILesson } & BaseResponseInterface,
      { lesson_id: string }
    >({
      query: ({ lesson_id }) => ({
        url: `/manager/lesson-import-export/export/${lesson_id}`,
        method: 'GET',
      }),
      transformResponse: (response: { lesson: ILesson } & BaseResponseInterface) => {
        // Create filename with lesson name and current date
        const currentDate = new Date().toISOString().split('T')[0]
        const filename = `${response.lesson.name}_${currentDate}.json`

        // Trigger download
        const blob = new Blob([JSON.stringify(response, null, 2)], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = filename
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)

        return response
      },
      invalidatesTags: [{ type: 'Lessons' }],
    }),
    generateLesson: builder.mutation<ILesson & BaseResponseInterface, ILessonGenerate>({
      query: ({ ...body }) => ({
        url: '/manager/lesson/generate',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Lessons' }],
    }),
    generateLessonMulti: builder.mutation<ILesson & BaseResponseInterface, ILessonGenerate>({
      query: ({ ...body }) => ({
        url: '/manager/lesson/generateMulti',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Lessons' }],
    }),
    createByCloningLesson: builder.mutation<ILessonCreate & BaseResponseInterface, void>({
      query: () => ({
        url: '/manager/lesson/createByCloningLesson',
        method: 'POST',
      }),
      invalidatesTags: [{ type: 'Lessons' }],
    }),
    createByAI: builder.mutation<ILessonCreate & BaseResponseInterface, AiLessonGenerate>({
      query: ({ ...body }) => ({
        url: '/manager/lesson/generate',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Lessons' }],
    }),
    askAI: builder.mutation<
      IOpenAiRequest & BaseResponseInterface,
      { prompt: string; add_response_format: string }
    >({
      query: ({ prompt, add_response_format = 'true' }) => ({
        url: '/manager/lesson/openAiRequest',
        method: 'POST',
        body: {
          prompt,
          add_response_format: add_response_format ? add_response_format : 'true',
        },
      }),
    }),
    createLessonUsingOpenAIAssistant: builder.mutation<
      IOpenAiRequest & BaseResponseInterface,
      AiLessonGenerate | { lesson_id?: string }
    >({
      query: (body) => ({
        url: '/manager/lesson/createLessonUsingOpenAIAssistant',
        method: 'POST',
        body,
      }),
    }),
    createLessonUsingN8n: builder.mutation<
      IOpenAiRequest & BaseResponseInterface,
      AiLessonGenerate | { lesson_id?: string }
    >({
      query: (body) => ({
        url: '/manager/lesson/createLessonUsingN8n',
        method: 'POST',
        body,
      }),
    }),
    createLessonUsingOpenAIAssistantBeta: builder.mutation<
      IOpenAiRequest & BaseResponseInterface,
      AiLessonGenerate
    >({
      query: (body) => ({
        url: '/manager/lesson/createLessonUsingOpenAIAssistantBeta',
        method: 'POST',
        body,
      }),
    }),
    deleteLesson: builder.mutation<ILessonDelete & BaseResponseInterface, ILessonDelete>({
      query: ({ id }) => ({
        url: `/manager/lesson/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Lessons' }],
    }),
    getLessonIntegrations: builder.query<
      Array<IIntegration & BaseResponseInterface>,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/manager/lesson/${id}/integration`,
        method: 'GET',
      }),
      providesTags: ['ContentIntegration'],
      keepUnusedDataFor: 0,
    }),
    addIntegration: builder.mutation<void, { lessonId: string; integration_id: string }>({
      query: ({ lessonId, ...body }) => ({
        url: `/manager/lesson/${lessonId}/integration`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['ContentIntegration'],
    }),
    removeIntegration: builder.mutation<void, { lessonId: string; integration_id: string }>({
      query: ({ lessonId, ...body }) => ({
        url: `/manager/lesson/${lessonId}/integration`,
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['ContentIntegration'],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetLessonsQuery,
  useGetLessonsByIdsQuery,
  useGetOwnLessonsQuery,
  useGetLessonQuery,
  useCloneLessonMutation,
  useGetLessonIntegrationsQuery,
  // -------------mutation-----------
  useCreateLessonMutation,
  useCreateByCloningLessonMutation,
  useCreateByAIMutation,
  useImportLessonMutation,
  useExportLessonMutation,
  useGenerateLessonMutation,
  useGenerateLessonMultiMutation,
  useAskAIMutation,
  useCreateLessonUsingN8nMutation,
  useCreateLessonUsingOpenAIAssistantMutation,
  useCreateLessonUsingOpenAIAssistantBetaMutation,
  useUpdateLessonMutation,
  useDeleteLessonMutation,
  useAddIntegrationMutation,
  useRemoveIntegrationMutation,
} = extendedApi
