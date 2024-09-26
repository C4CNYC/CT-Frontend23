import { BaseListResponseInterface, BaseResponseInterface } from '@/utils'

import { ILesson, ILessonSearchParams } from '../interfaces/courseUnits.interface'

import { adminApi } from '.'

const extendedApi = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminLessons: builder.query<
      BaseListResponseInterface<ILesson & BaseResponseInterface>,
      ILessonSearchParams
    >({
      query: (params) => ({
        url: '/lesson/',
        method: 'GET',
        params,
      }),
      providesTags: ['Lessons'],
    }),
    getAllAdminLessons: builder.query<
      BaseListResponseInterface<ILesson & BaseResponseInterface>,
      ILessonSearchParams
    >({
      query: (params) => ({
        url: '/lesson/all',
        method: 'GET',
        params,
      }),
      providesTags: ['Lessons'],
    }),
  }),
})

export const { useGetAdminLessonsQuery, useGetAllAdminLessonsQuery } = extendedApi
