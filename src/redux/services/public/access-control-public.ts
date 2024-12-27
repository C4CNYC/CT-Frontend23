import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWrapper } from '../helpers/base_query_wrapper'
import { IAccessControl, IAccessControlsResponse } from '../interfaces/access-control.interface'

export const accessControlApi = createApi({
  reducerPath: 'api/accessControl',
  baseQuery: baseQueryWrapper(`${process.env.NEXT_PUBLIC_API_URL}/access-control`),
  tagTypes: ['self', 'AccessControl'],
  endpoints: (builder) => ({
    getAllFeatures: builder.query<IAccessControlsResponse, void>({
      query: () => '/all',
    }),
    getSelfAccess: builder.query<IAccessControlsResponse, void>({
      query: () => ({
        url: '/self',
        method: 'GET',
      }),
    }),
    getByUserId: builder.query<IAccessControlsResponse, { userId: string }>({
      query: ({ userId }) => ({
        url: `/${userId}`,
        method: 'GET',
      }),
      providesTags: (result, error, { userId }) => [{ type: 'AccessControl', userId }],
    }),
    decreaseToUserId: builder.mutation<number, { feature: string }>({
      query: ({ feature }) => ({
        url: `/${feature}`,
        method: 'DELETE',
      }),
    }),
    addFeature: builder.mutation<IAccessControlsResponse, IAccessControl>({
      query: ({ userId, ...dto }) => ({
        url: `/${userId}`,
        method: 'POST',
        body: dto,
      }),
      invalidatesTags: (result, error, { userId }) => [{ type: 'AccessControl', userId }],
    }),
  }),
})

export const {
  useGetAllFeaturesQuery,
  useGetSelfAccessQuery,
  useGetByUserIdQuery,
  useDecreaseToUserIdMutation,
  useAddFeatureMutation,
} = accessControlApi
