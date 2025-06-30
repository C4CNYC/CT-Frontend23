import { BaseListResponseInterface, BaseResponseInterface } from '@/utils'

import { IAuthor, IModuleAuthorSearchParams } from '../interfaces/author.interface'

import { managerApi } from '.'

const extendedApi = managerApi.injectEndpoints({
  endpoints: (builder) => ({
    getModuleAuthors: builder.query<
      BaseListResponseInterface<IAuthor & BaseResponseInterface>,
      IModuleAuthorSearchParams
    >({
      query: (params) => ({
        url: '/manager/unit-author',
        method: 'GET',
        params,
      }),
      providesTags: ['ModuleAuthor'],
    }),
    updateModuleAuthor: builder.mutation<
      IAuthor & BaseResponseInterface,
      Omit<IAuthor, 'avatar' | 'email'>
    >({
      query: ({ id, ...body }) => ({
        url: `/manager/unit-author/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [{ type: 'ModuleAuthor' }],
    }),
    updateModuleAuthorCover: builder.mutation<
      IAuthor & BaseResponseInterface,
      { id: string; file: FormData }
    >({
      query: ({ id, file }) => ({
        url: `/manager/unit-author/${id}/cover`,
        method: 'PATCH',
        body: file,
      }),
      invalidatesTags: [{ type: 'ModuleAuthor' }],
    }),
    createModuleAuthor: builder.mutation<
      IAuthor & BaseResponseInterface,
      { course_unit_id: string } & Omit<IAuthor, 'avatar' | 'id'>
    >({
      query: ({ ...body }) => ({
        url: '/manager/unit-author',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'ModuleAuthor' }],
    }),
    deleteModuleAuthor: builder.mutation<IAuthor & BaseResponseInterface, { id: string }>({
      query: ({ id }) => ({
        url: `/manager/unit-author/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'ModuleAuthor' }],
    }),
    addAuthorToModule: builder.mutation<void, { id: string; course_unit_id: string }>({
      query: ({ id, ...body }) => ({
        url: `/manager/unit-author/${id}/course`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [{ type: 'ModuleAuthor' }],
    }),
    removeAuthorFromModule: builder.mutation<void, { id: string; course_unit_id: string }>({
      query: ({ id, ...body }) => ({
        url: `/manager/unit-author/${id}/course`,
        method: 'DELETE',
        body,
      }),
      invalidatesTags: [{ type: 'ModuleAuthor' }],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetModuleAuthorsQuery,
  // -----------------
  useAddAuthorToModuleMutation,
  useCreateModuleAuthorMutation,
  useDeleteModuleAuthorMutation,
  useRemoveAuthorFromModuleMutation,
  useUpdateModuleAuthorCoverMutation,
  useUpdateModuleAuthorMutation,
} = extendedApi
