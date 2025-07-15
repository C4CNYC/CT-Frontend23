import { BaseListResponseInterface, BaseResponseInterface } from '@/utils'

import { IAuthor, ICourseAuthorSearchParams } from '../interfaces/author.interface'

import { managerApi } from '.'

const extendedApi = managerApi.injectEndpoints({
  endpoints: (builder) => ({
    getCourseAuthors: builder.query<
      BaseListResponseInterface<IAuthor & BaseResponseInterface>,
      ICourseAuthorSearchParams
    >({
      query: (params) => ({
        url: '/manager/author',
        method: 'GET',
        params,
      }),
      providesTags: ['CourseAuthor'],
    }),
    updateCourseAuthor: builder.mutation<
      IAuthor & BaseResponseInterface,
      Omit<IAuthor, 'avatar' | 'email'>
    >({
      query: ({ id, ...body }) => ({
        url: `/manager/author/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [{ type: 'CourseAuthor' }],
    }),
    updateCourseAuthorCover: builder.mutation<
      IAuthor & BaseResponseInterface,
      { id: string; file: FormData }
    >({
      query: ({ id, file }) => ({
        url: `/manager/author/${id}/cover`,
        method: 'PATCH',
        body: file,
      }),
      invalidatesTags: [{ type: 'CourseAuthor' }],
    }),
    createCourseAuthor: builder.mutation<
      IAuthor & BaseResponseInterface,
      { course_id: string } & Omit<IAuthor, 'avatar' | 'id'>
    >({
      query: ({ ...body }) => ({
        url: '/manager/author',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'CourseAuthor' }],
    }),
    deleteCourseAuthor: builder.mutation<IAuthor & BaseResponseInterface, { id: string }>({
      query: ({ id }) => ({
        url: `/manager/author/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'CourseAuthor' }],
    }),
    addAuthorToCourse: builder.mutation<void, { id: string; course_id: string }>({
      query: ({ id, ...body }) => ({
        url: `/manager/author/${id}/course`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [{ type: 'CourseAuthor' }],
    }),
    removeAuthorFromCourse: builder.mutation<void, { id: string; course_id: string }>({
      query: ({ id, ...body }) => ({
        url: `/manager/author/${id}/course`,
        method: 'DELETE',
        body,
      }),
      invalidatesTags: [{ type: 'CourseAuthor' }],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetCourseAuthorsQuery,
  // -----------------
  useAddAuthorToCourseMutation,
  useCreateCourseAuthorMutation,
  useDeleteCourseAuthorMutation,
  useRemoveAuthorFromCourseMutation,
  useUpdateCourseAuthorCoverMutation,
  useUpdateCourseAuthorMutation,
} = extendedApi
