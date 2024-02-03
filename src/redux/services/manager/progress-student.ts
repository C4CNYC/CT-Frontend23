import { BaseResponseInterface } from '@/lib/utils/baseResponse.interface'
import { IProgress } from '@/redux/interfaces/progress.interface'

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
  }),
  overrideExisting: true,
})

export const {
  useGetMyProgressByCourseQuery,
  // -------------mutation-----------
  useCompleteLessonMutation,
} = extendedApi
