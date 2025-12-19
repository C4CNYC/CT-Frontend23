import { IProgress } from '@/redux/interfaces/progress.interface'
import { BaseResponseInterface } from '@/utils/baseResponse.interface'

import { managerApi } from '.'

const extendedApi = managerApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyProgressByCourse: builder.query<IProgress & BaseResponseInterface, { id: string }>({
      query: ({ id }) => ({
        url: `/student/course/${id}/progress`,
        method: 'GET',
      }),
      providesTags: ['Progress'],
    }),
    completeLesson: builder.mutation<
      string,
      { id: string; lesson_content_id: string; module_id: string; code?: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/student/progress/complete-chalange`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Progress'],
    }),
    resetContentChalanges: builder.mutation<string, { lesson_id: string }>({
      query: ({ lesson_id, ...body }) => ({
        url: `/student/progress/reset-challenges`,
        method: 'POST',
        body: {
          lesson_id,
          ...body,
        },
      }),
      invalidatesTags: ['GetCompleteChalange'],
    }),

    getLastLessonByCourse: builder.query<any, { courseId: string; studentId: string }>({
      query: ({ courseId, studentId }) => ({
        url: `/student/progress/course/${courseId}/${studentId}`,
        method: 'GET',
      }),
      providesTags: ['Progress'],
    }),

    getLastLessonByModule: builder.query<any, { moduleId: string; studentId: string }>({
      query: ({ moduleId, studentId }) => ({
        url: `/student/progress/module/${moduleId}/${studentId}`,
        method: 'GET',
      }),
      providesTags: ['Progress'],
    }),

    completeStudentLesson: builder.mutation<any, { studentId: string; lessonId: string }>({
      query: ({ studentId, lessonId }) => ({
        url: `/student/progress/complete-lesson`,
        method: 'POST',
        body: {
          studentId,
          lessonId,
        },
      }),
      invalidatesTags: ['Progress'],
    }),

    visitStudentLesson: builder.mutation<any, { studentId: string; lessonId: string }>({
      query: ({ studentId, lessonId }) => ({
        url: `/student/progress/visit-lesson`,
        method: 'POST',
        body: {
          studentId,
          lessonId,
        },
      }),
      invalidatesTags: ['Progress'],
    }),
  }),
  overrideExisting: true,
})

export const {
  useGetMyProgressByCourseQuery,
  useCompleteLessonMutation,
  useResetContentChalangesMutation,
  useGetLastLessonByCourseQuery,
  useGetLastLessonByModuleQuery,
  useCompleteStudentLessonMutation,
  useVisitStudentLessonMutation,
} = extendedApi
