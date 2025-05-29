import { BaseResponseInterface } from '@/utils/baseResponse.interface'

import {
  ITenantLogo,
  ITenantLogoResponse,
  ITenantUpdateInfo,
} from '../interfaces/organization.interface'

import { tenantApi } from '.'

const extendedApi = tenantApi.injectEndpoints({
  endpoints: (builder) => ({
    setTenantLogo: builder.mutation<ITenantLogoResponse & BaseResponseInterface, ITenantLogo>({
      query: ({ userId, file }) => {
        const formData = new FormData()
        formData.append('userId', userId)
        formData.append('file', file)

        return {
          url: '/upload-logo',
          method: 'POST',
          body: formData,
        }
      },
    }),
    updateTenantInfo: builder.mutation<
      ITenantUpdateInfo & BaseResponseInterface,
      ITenantUpdateInfo
    >({
      query: ({ ...body }) => ({
        url: '/update-info/',
        method: 'POST',
        body,
      }),
    }),
  }),
})
export const { useSetTenantLogoMutation, useUpdateTenantInfoMutation } = extendedApi
