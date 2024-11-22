import { createApi } from '@reduxjs/toolkit/query/react'

import { IClass } from '@/redux/interfaces/class.interface'
import {
  ICourseContent,
  ICourseElement,
  ICourseSearchParams,
  ILesson,
  ILessonContent,
} from '@/redux/interfaces/content.interface'
import { IGallery } from '@/redux/interfaces/gallary.interface'
import { BaseListResponseInterface, BaseResponseInterface } from '@/utils'

import { baseQueryWrapper } from './helpers/base_query_wrapper'
import { ILesson as ILessonFromCourseUnits } from './interfaces/courseUnits.interface'

export const studentPublicApi = createApi({
  reducerPath: 'api/public',
  baseQuery: baseQueryWrapper(`${process.env.NEXT_PUBLIC_API_URL}/student/public`),
  tagTypes: [
    'CoursePublic',
    'LessonPublic',
    'LessonPublicContent',
    'CoursePublicContent',
    'Projects',
    'ClassPublic',
  ],
  endpoints: () => ({}),
})

const extendedApi = studentPublicApi.injectEndpoints({
  endpoints: (builder) => ({
    getPublicCourse: builder.query<
      BaseListResponseInterface<ICourseElement & BaseResponseInterface>,
      ICourseSearchParams
    >({
      query: () => ({
        url: '/course',
        method: 'GET',
      }),
      providesTags: ['CoursePublic'],
    }),
    getPublicCourseContent: builder.query<ICourseContent & BaseResponseInterface, { id: string }>({
      query: ({ id }) => ({
        url: `/course/${id}/content`,
        method: 'GET',
      }),
      providesTags: ['CoursePublicContent'],
    }),
    getPublicLesson: builder.query<
      ILesson & BaseResponseInterface,
      { id: string; lesson_id: string }
    >({
      query: ({ id, lesson_id: lessonId }) => ({
        url: `/course/${id}/lesson/${lessonId}`,
        method: 'GET',
      }),
      providesTags: ['LessonPublic'],
    }),
    getPublicLessonBySlug: builder.query<
      BaseListResponseInterface<ILessonFromCourseUnits & BaseResponseInterface>,
      { slug: string }
    >({
      query: ({ slug }) => ({
        url: `/lesson?slug=${slug}`,
        method: 'GET',
      }),
      providesTags: ['LessonPublic'],
    }),
    getPublicLessonContent: builder.query<
      Array<ILessonContent & BaseResponseInterface>,
      { id: string; lesson_id: string }
    >({
      query: ({ id, lesson_id: lessonId }) => ({
        url: `/course/${id}/${lessonId}/content`,
        method: 'GET',
      }),
      providesTags: ['LessonPublicContent'],
    }),
    getPublicProject: builder.query<IGallery & BaseResponseInterface, { id: string }>({
      query: ({ id }) => ({
        url: `/project/${id}`,
        method: 'GET',
      }),
      providesTags: ['Projects'],
    }),
    getPublicClass: builder.query<IClass & BaseResponseInterface, { id: string }>({
      query: ({ id }) => ({
        url: `/student/public/class/${id}`,
        method: 'GET',
      }),
      providesTags: ['ClassPublic'],
    }),
  }),
})

export const {
  useGetPublicCourseContentQuery,
  useGetPublicCourseQuery,
  useGetPublicLessonQuery,
  useGetPublicLessonBySlugQuery,
  useGetPublicLessonContentQuery,
  useGetPublicClassQuery,
  // ------  projects  ---------
  useGetPublicProjectQuery,
} = extendedApi
