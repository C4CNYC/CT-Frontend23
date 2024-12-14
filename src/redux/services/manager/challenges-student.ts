import { IChallenges } from '@/redux/interfaces/challenges.interface'
import { BaseResponseInterface } from '@/utils/baseResponse.interface'

import { managerApi } from '.'

const extendedApi = managerApi.injectEndpoints({
  endpoints: (builder) => ({
    getCourseContent: builder.query<IChallenges & BaseResponseInterface, { id: string }>({
      query: ({ id }) => ({
        url: `/student/course/${id}/content`,
        method: 'GET',
      }),
      providesTags: ['Challenges'],
    }),
    getCoursePublicContent: builder.query<IChallenges & BaseResponseInterface, { id: string }>({
      query: ({ id }) => ({
        url: `public/workspace/course/${id}/content`,
        method: 'GET',
      }),
      providesTags: ['Challenges'],
    }),
  }),
})
export const { useGetCourseContentQuery, useGetCoursePublicContentQuery } = extendedApi
