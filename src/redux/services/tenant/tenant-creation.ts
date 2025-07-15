import { BaseResponseInterface } from '@/utils/baseResponse.interface'

import {
  ITenantLogo,
  ITenantLogoResponse,
  ITenantUpdateInfo,
  ITenantBrandNameAndSubdomainResponse,
  ITenantBrandNameCheck,
  ITenantSubdomainCheck,
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

    checkBrandName: builder.mutation<
      ITenantBrandNameCheck & ITenantBrandNameAndSubdomainResponse,
      ITenantBrandNameCheck
    >({
      query: ({ ...body }) => ({
        url: '/check-brand/',
        method: 'POST',
        body,
      }),
    }),
    checkSubdomain: builder.mutation<
      ITenantSubdomainCheck & ITenantBrandNameAndSubdomainResponse,
      ITenantSubdomainCheck
    >({
      query: ({ ...body }) => ({
        url: '/check-subdomain/',
        method: 'POST',
        body,
      }),
    }),
  }),
})
export const {
  useSetTenantLogoMutation,
  useUpdateTenantInfoMutation,
  useCheckBrandNameMutation,
  useCheckSubdomainMutation,
} = extendedApi
