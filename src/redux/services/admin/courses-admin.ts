import { BaseListResponseInterface, BaseResponseInterface } from '@/utils'

import { ICourse, ICourseSearchParams } from '../interfaces/courseUnits.interface'

import { adminApi } from '.'

const extendedApi = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminCourses: builder.query<
      BaseListResponseInterface<ICourse & BaseResponseInterface>,
      ICourseSearchParams
    >({
      query: (params) => ({
        url: '/course',
        method: 'GET',
        params,
      }),
      keepUnusedDataFor: 0,
      providesTags: ['Courses'],
    }),
    getOwnCourses: builder.query<
      BaseListResponseInterface<ICourse & BaseResponseInterface>,
      ICourseSearchParams
    >({
      query: (params) => ({
        url: '/course/own',
        method: 'GET',
        params,
      }),
      keepUnusedDataFor: 0,
      providesTags: ['Courses'],
    }),
  }),
})

export const { useGetAdminCoursesQuery, useGetOwnCoursesQuery } = extendedApi
