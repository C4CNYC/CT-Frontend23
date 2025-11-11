import { BaseResponseInterface } from '@/utils'

import { IEnvironment, IEnvironmentSearch } from '../../interfaces/environment.interface'

import { managerApi } from '.'

const extendedApi = managerApi.injectEndpoints({
  endpoints: (builder) => ({
    getEnvironments: builder.query<(IEnvironment & BaseResponseInterface)[], IEnvironmentSearch>({
      query: (params) => ({
        url: '/manager/environments',
        method: 'GET',
        params,
      }),
      providesTags: ['Environments'],
    }),
    getEnvironment: builder.query<IEnvironment & BaseResponseInterface, { id: string }>({
      query: ({ id }) => ({
        url: `/manager/environments/${id}`,
        method: 'GET',
      }),
      providesTags: ['Environments'],
    }),
    createEnvironment: builder.mutation<IEnvironment & BaseResponseInterface, IEnvironment>({
      query: ({ ...body }) => ({
        url: '/manager/environments',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Environments'],
    }),
    updateEnvironment: builder.mutation<
      IEnvironment & BaseResponseInterface,
      { id: string } & IEnvironment
    >({
      query: ({ id, ...body }) => ({
        url: `/manager/environments/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Environments'],
    }),
    deleteEnvironment: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/manager/environments/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Environments'],
    }),
    uploadEnvironmentFile: builder.mutation<
      IEnvironment & BaseResponseInterface,
      { id: string; file: FormData }
    >({
      query: ({ id, file }) => ({
        url: `/manager/environments/${id}/file`,
        method: 'POST',
        body: file,
      }),
      invalidatesTags: ['Environments'],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetEnvironmentsQuery,
  useGetEnvironmentQuery,
  // -------------mutation-----------
  useCreateEnvironmentMutation,
  useUpdateEnvironmentMutation,
  useDeleteEnvironmentMutation,
  useUploadEnvironmentFileMutation,
} = extendedApi
