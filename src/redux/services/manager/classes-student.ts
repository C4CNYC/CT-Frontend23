import {
  ClassProgressResult,
  ClassSearchParams,
  IClass,
  IMentor,
} from '@/redux/interfaces/class.interface'
import { BaseListResponseInterface, BaseResponseInterface } from '@/utils'

import { IStudent, IStudentSearchParams } from '../interfaces/user.interface'

import { managerApi } from '.'

const extendedApi = managerApi.injectEndpoints({
  endpoints: (builder) => ({
    createClass: builder.mutation<void, IClass>({
      query: ({ ...body }) => ({
        url: '/student/class',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Classes'],
    }),
    joinClass: builder.mutation<
      { status: 'joined'; tribe: IClass & BaseResponseInterface },
      { share_token: string }
    >({
      query: ({ ...body }) => ({
        url: '/student/class/join',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['ClassesStudent'],
    }),
    getStudentClasses: builder.query<
      BaseListResponseInterface<IClass & BaseResponseInterface>,
      ClassSearchParams
    >({
      query: ({ ...params }) => ({
        url: '/student/class',
        method: 'GET',
        params,
      }),
      keepUnusedDataFor: 60,
      providesTags: ['ClassesStudent', 'Classes'],
    }),
    getClass: builder.query<IClass & BaseResponseInterface, { id: string }>({
      query: ({ id }) => ({
        url: `/student/class/${id}`,
        method: 'GET',
      }),
      providesTags: ['ClassesStudent'],
    }),
    getClassProgress: builder.query<ClassProgressResult, { id: string }>({
      query: ({ id }) => ({
        url: `/student/class/${id}/progress`,
        method: 'GET',
      }),
      providesTags: ['ClassesStudentProgress'],
    }),
    getClassStudents: builder.query<
      BaseListResponseInterface<IStudent & BaseResponseInterface>,
      { id: string } & IStudentSearchParams
    >({
      query: ({ id, ...params }) => ({
        url: `/student/class/${id}/students`,
        method: 'GET',
        params,
      }),
      providesTags: ['ClassesStudentList'],
    }),
    getClassMentor: builder.query<IMentor[], { id: string }>({
      query: ({ id }) => ({
        url: `/student/class/${id}/mentor`,
        method: 'GET',
      }),
      transformResponse: (response: IMentor[]) => {
        const manager = response.filter((el) => el.role === 'manager')
        return manager ?? response
      },
      providesTags: ['ClassesStudent'],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetStudentClassesQuery,
  useGetClassQuery,
  useGetClassProgressQuery,
  useGetClassMentorQuery,
  useGetClassStudentsQuery,
  // -------------mutation-----------
  useJoinClassMutation,
  useCreateClassMutation,
} = extendedApi
