import { BaseResponseInterface } from '@/utils/baseResponse.interface'

import {
  ILessonContent,
  ILessonContentUpdate,
  ILessonPreloadFile,
} from '../interfaces/courseUnits.interface'

import { managerApi } from '.'

const extendedApi = managerApi.injectEndpoints({
  endpoints: (builder) => ({
    getLessonContent: builder.query<
      Array<ILessonContent & BaseResponseInterface>,
      { lessonId: string }
    >({
      query: ({ lessonId }) => ({
        url: `/manager/lesson/${lessonId}/content`,
        method: 'GET',
      }),
      providesTags: ['LessonsContent'],
      transformResponse: (
        res: Array<ILessonContent & BaseResponseInterface>
      ): Array<ILessonContent & BaseResponseInterface> =>
        res.sort((a, b) => a.meta.order - b.meta.order),
    }),
    getLessonContentById: builder.query<
      ILessonContent & BaseResponseInterface,
      { lessonId: string; id: string }
    >({
      query: ({ lessonId, id }) => ({
        url: `/manager/lesson/${lessonId}/content/${id}`,
        method: 'GET',
      }),
      providesTags: ['LessonContentItem'],
      keepUnusedDataFor: 0,
    }),

    createLessonContent: builder.mutation<
      ILessonContent,
      { lessonId: string } & Omit<ILessonContentUpdate, 'cover'>
    >({
      query: ({ lessonId, ...body }) => ({
        url: `/manager/lesson/${lessonId}/content`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'LessonsContent' }],
    }),
    updateLessonContent: builder.mutation<
      ILessonContent,
      { lessonId: string; id: string } & ILessonContentUpdate
    >({
      query: ({ lessonId, id, ...body }) => ({
        url: `/manager/lesson/${lessonId}/content/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [{ type: 'LessonsContent' }],
    }),

    removeLessonContent: builder.mutation<ILessonContent, { lessonId: string; id: string }>({
      query: ({ lessonId, id }) => ({
        url: `/manager/lesson/${lessonId}/content/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'LessonsContent' }],
    }),

    getLessonSlidePreloadFiles: builder.query<
      Array<ILessonPreloadFile & BaseResponseInterface>,
      { lessonId: string; contentId: string }
    >({
      query: ({ lessonId, contentId }) => ({
        url: `/manager/lesson/${lessonId}/content/${contentId}/file`,
        method: 'GET',
      }),
      providesTags: ['LessonSlidePreload'],
      transformResponse: (
        res: Array<ILessonPreloadFile & BaseResponseInterface>
      ): Array<ILessonPreloadFile & BaseResponseInterface> =>
        res.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()),
      keepUnusedDataFor: 0,
    }),

    getLessonFiles: builder.query<
      Array<ILessonPreloadFile & BaseResponseInterface>,
      { lessonId: string }
    >({
      query: ({ lessonId }) => ({
        url: `/manager/lesson/${lessonId}/content/files`,
        method: 'GET',
      }),
      providesTags: ['LessonSlidePreload'],
      transformResponse: (
        res: Array<ILessonPreloadFile & BaseResponseInterface>
      ): Array<ILessonPreloadFile & BaseResponseInterface> =>
        res.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()),
      keepUnusedDataFor: 0,
    }),

    addLessonStepPreloadFile: builder.mutation<
      ILessonPreloadFile,
      { lessonId: string; contentId: string } & Omit<ILessonPreloadFile, 'id'>
    >({
      query: ({ lessonId, contentId, name, extension, preloaded_code }) => ({
        url: `/manager/lesson/${lessonId}/content/${contentId}/file`,
        method: 'POST',
        body: { name, extension, preloaded_code },
      }),
      invalidatesTags: ['LessonSlidePreload'],
    }),

    updateLessonStepPreloadFile: builder.mutation<
      ILessonPreloadFile,
      { lessonId: string; contentId: string; fileId: string } & Partial<
        Omit<ILessonPreloadFile, 'id'>
      >
    >({
      query: ({ lessonId, contentId, fileId, ...body }) => ({
        url: `/manager/lesson/${lessonId}/content/${contentId}/file/${fileId}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['LessonSlidePreload'],
    }),

    removeLessonStepPreloadFile: builder.mutation<
      ILessonPreloadFile,
      { lessonId: string; contentId: string; fileId: string }
    >({
      query: ({ lessonId, contentId, fileId }) => ({
        url: `/manager/lesson/${lessonId}/content/${contentId}/file/${fileId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['LessonSlidePreload'],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetLessonContentQuery,
  useGetLessonContentByIdQuery,
  useGetLessonSlidePreloadFilesQuery,
  useGetLessonFilesQuery,
  // -------------mutation-----------
  useUpdateLessonContentMutation,
  useCreateLessonContentMutation,
  useRemoveLessonContentMutation,
  useAddLessonStepPreloadFileMutation,
  useUpdateLessonStepPreloadFileMutation,
  useRemoveLessonStepPreloadFileMutation,
} = extendedApi
