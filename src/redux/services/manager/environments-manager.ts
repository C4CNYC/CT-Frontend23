import { BaseListResponseInterface, BaseResponseInterface } from '@/utils'

import { IEnvironment, IEnvironmentSearch } from '../interfaces/environment.interface'

import { managerApi } from '.'

const extendedApi = managerApi.injectEndpoints({
  endpoints: (builder) => ({
    getEnvironmentsList: builder.query<
      BaseListResponseInterface<IEnvironment & BaseResponseInterface>,
      IEnvironmentSearch
    >({
      query: (params) => ({
        url: '/manager/environments',
        method: 'GET',
        params,
      }),
      providesTags: ['Environments'],
    }),
    createEnvironment: builder.mutation<IEnvironment, IEnvironment>({
      query: ({ ...body }) => ({
        url: '/manager/environments',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Environments'],
    }),
    editEnvironment: builder.mutation<IEnvironment, { id: string } & IEnvironment>({
      query: ({ id, ...body }) => ({
        url: `/manager/environments/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Environments'],
    }),
    deleteEnvironment: builder.mutation<IEnvironment, { environmentId: string }>({
      query: ({ environmentId }) => ({
        url: `/manager/environments/${environmentId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Environments'],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetEnvironmentsListQuery,
  // -------------mutation-----------
  useCreateEnvironmentMutation,
  useDeleteEnvironmentMutation,
  useEditEnvironmentMutation,
} = extendedApi
