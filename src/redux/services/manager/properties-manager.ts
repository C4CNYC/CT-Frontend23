import { IProperty, IPropertySearchParams } from '../interfaces/properties.interface'

import { managerApi } from '.'

const extendedApi = managerApi.injectEndpoints({
  endpoints: (builder) => ({
    getProperties: builder.query<IProperty[], IPropertySearchParams>({
      query: (params) => ({
        url: `/manager/property`,
        method: 'GET',
        params,
      }),
      providesTags: ['Properties'],
    }),
    createProperty: builder.mutation<IProperty, IProperty>({
      query: (body) => ({
        url: `/manager/property`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Properties'],
    }),
    updateProperty: builder.mutation<IProperty, IProperty>({
      query: ({ id, ...body }) => ({
        url: `/manager/property/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Properties'],
    }),
    deleteProperty: builder.mutation<IProperty, { id: string }>({
      query: ({ id }) => ({
        url: `/manager/property/${id}`,
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
