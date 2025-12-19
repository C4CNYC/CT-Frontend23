import { BaseListResponseInterface } from '@root/src/utils'

import {
  IProperty,
  IPropertyCreate,
  IPropertySearchParams,
  IPropertyUpdate,
} from '../interfaces/properties.interface'

import { managerApi } from '.'

const extendedApi = managerApi.injectEndpoints({
  endpoints: (builder) => ({
    getProperties: builder.query<BaseListResponseInterface<IProperty>, IPropertySearchParams>({
      query: (params) => ({
        url: `/admin/properties`,
        method: 'GET',
        params: {
          take: 100,
          ...params,
        },
      }),
      providesTags: ['Properties'],
    }),
    createProperty: builder.mutation<IProperty, IPropertyCreate>({
      query: (body) => ({
        url: `/admin/properties`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Properties'],
    }),
    updateProperty: builder.mutation<IProperty, IPropertyUpdate>({
      query: ({ id, ...body }) => ({
        url: `/admin/properties/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Properties'],
    }),
    deleteProperty: builder.mutation<IProperty, { id: string }>({
      query: ({ id }) => ({
        url: `/admin/properties/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Properties'],
    }),
  }),
})

export const {
  useGetPropertiesQuery,
  useCreatePropertyMutation,
  useUpdatePropertyMutation,
  useDeletePropertyMutation,
} = extendedApi
