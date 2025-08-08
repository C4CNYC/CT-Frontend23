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
    getAdminGlobalCourses: builder.query<
      BaseListResponseInterface<ICourse & BaseResponseInterface>,
      ICourseSearchParams
    >({
      query: (params) => ({
        url: '/course/global',
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
    updateAdminGlobalCourseInCatalogByOrg: builder.mutation<
      ICourse & BaseResponseInterface,
      { course_id: string; org_id: string; is_show_in_catalog: boolean }
    >({
      query: ({ course_id, ...body }) => ({
        url: `/course/catalog/${course_id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Courses'],
    }),
  }),
})

export const {
  useGetAdminCoursesQuery,
  useGetOwnCoursesQuery,
  useGetAdminGlobalCoursesQuery,
  useUpdateAdminGlobalCourseInCatalogByOrgMutation,
} = extendedApi
