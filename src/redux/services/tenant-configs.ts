import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface ITenantConfig {
  tenant: string
  logoUrl: string
  logoNormalUrl: string
}

export const tenantConfigApi = createApi({
  reducerPath: 'configs/',
  baseQuery: fetchBaseQuery({ baseUrl: `/configs` }),
  tagTypes: ['TenantConfig'],
  endpoints: (builder) => ({
    getTenantConfiguration: builder.query<ITenantConfig, { tenantName: string }>({
      query: ({ tenantName }) => ({
        url: `${tenantName}.config.json`,
        method: 'GET',
        responseHandler(response) {
          return response.json()
        },
      }),
    }),
  }),
})

export const { useGetTenantConfigurationQuery } = tenantConfigApi
