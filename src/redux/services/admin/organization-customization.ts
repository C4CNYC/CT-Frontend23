import { BaseResponseInterface } from '@/lib/utils/baseResponse.interface'

import { CustomizationResponce, ICustomization } from '../interfaces/organization.interface'

import { adminApi } from '.'

const extendedApi = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    updateOrgCustomization: builder.mutation<
      ICustomization & BaseResponseInterface,
      ICustomization
    >({
      query: ({ ...body }) => ({
        url: '/org/custom/',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [{ type: 'OrganizationCustomization' }],
    }),
    getOrgCustomization: builder.query<CustomizationResponce, void>({
      query: () => ({
        url: '/org/custom/',
        method: 'GET',
      }),
      providesTags: ['OrganizationCustomization'],
    }),
  }),
})

export const { useGetOrgCustomizationQuery, useUpdateOrgCustomizationMutation } = extendedApi
