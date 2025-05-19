import { BaseResponseInterface } from '@/utils/baseResponse.interface'

import { ITenantLogo, ITenantUpdateInfo } from '../interfaces/organization.interface'

import { tenantApi } from '.'

const extendedApi = tenantApi.injectEndpoints({
  endpoints: (builder) => ({
    setTenantLogo: builder.mutation<ITenantLogo & BaseResponseInterface, ITenantLogo>({
      query: ({ ...body }) => ({
        url: '/upload-logo/',
        method: 'POST',
        body,
      }),
    }),
    updateTenantInfo: builder.mutation<
      ITenantUpdateInfo & BaseResponseInterface,
      ITenantUpdateInfo
    >({
      query: ({ ...body }) => ({
        url: '/update-info/',
        method: 'PUTCH',
        body,
      }),
    }),
  }),
})
export const { useSetTenantLogoMutation, useUpdateTenantInfoMutation } = extendedApi
