import { createApi } from '@reduxjs/toolkit/query/react'

import { BaseListResponseInterface, BaseResponseInterface } from '@root/src/utils'

import { baseQueryWrapper } from '../helpers/base_query_wrapper'
import {
  AdminSearchParams,
  IAdministration,
  IAdministrationCreate,
} from '../interfaces/administration'

export const superAdmin = createApi({
  reducerPath: 'superAdmin',
  baseQuery: baseQueryWrapper(`${process.env.NEXT_PUBLIC_API_URL}/super-admin`),
  tagTypes: ['Administration'],
  endpoints: (builder) => ({
    getOrgList: builder.query<
      BaseListResponseInterface<IAdministration & BaseResponseInterface>,
      AdminSearchParams
    >({
      query: ({ ...params }) => ({
        url: `/org`,
        method: 'GET',
        params,
      }),
      providesTags: ['Administration'],
    }),
    getOrg: builder.query<IAdministration & BaseResponseInterface, { id: string }>({
      query: ({ id, ...params }) => ({
        url: `/org/${id}`,
        method: 'GET',
        params,
      }),
      providesTags: ['Administration'],
    }),
    createOrg: builder.mutation<IAdministration & BaseResponseInterface, IAdministrationCreate>({
      query: (body) => ({
        url: '/org',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Administration'],
    }),
    updateOrg: builder.mutation<
      IAdministration & BaseResponseInterface,
      { id: string } & Partial<IAdministrationCreate>
    >({
      query: ({ id, ...body }) => ({
        url: `/org/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Administration'],
    }),
    deleteOrg: builder.mutation<IAdministration & BaseResponseInterface, { id: string }>({
      query: ({ id, ...body }) => ({
        url: `/org/${id}`,
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['Administration'],
    }),
    updateOrgLogo: builder.mutation<
      IAdministration & BaseResponseInterface,
      { id: string; file: FormData }
    >({
      query: ({ id, file }) => ({
        url: `/org/${id}/logo`,
        method: 'PATCH',
        body: file,
      }),
      invalidatesTags: ['Administration'],
    }),
    deleteOrgLogo: builder.mutation<BaseResponseInterface, { id: string }>({
      query: ({ id }) => ({
        url: `/org/${id}/logo`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Administration'],
    }),

    updateOrgLogoMini: builder.mutation<
      IAdministration & BaseResponseInterface,
      { id: string; file: FormData }
    >({
      query: ({ id, file }) => ({
        url: `/org/${id}/mini-logo`,
        method: 'PATCH',
        body: file,
      }),
      invalidatesTags: ['Administration'],
    }),
    deleteOrgLogoMini: builder.mutation<BaseResponseInterface, { id: string }>({
      query: ({ id }) => ({
        url: `/org/${id}/mini-logo`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Administration'],
    }),

    updateOrgFavicon: builder.mutation<
      IAdministration & BaseResponseInterface,
      { id: string; file: FormData }
    >({
      query: ({ id, file }) => ({
        url: `/org/${id}/favicon`,
        method: 'PATCH',
        body: file,
      }),
      invalidatesTags: ['Administration'],
    }),
    deleteOrgFavicon: builder.mutation<BaseResponseInterface, { id: string }>({
      query: ({ id }) => ({
        url: `/org/${id}/favicon`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Administration'],
    }),
  }),
})

export const {
  useGetOrgListQuery,
  useGetOrgQuery,
  useCreateOrgMutation,
  useUpdateOrgMutation,
  useUpdateOrgLogoMiniMutation,
  useUpdateOrgLogoMutation,
  useDeleteOrgMutation,
  useUpdateOrgFaviconMutation,
  useDeleteOrgLogoMutation,
  useDeleteOrgLogoMiniMutation,
  useDeleteOrgFaviconMutation,
} = superAdmin
