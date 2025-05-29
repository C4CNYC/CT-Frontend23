import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWrapper } from '../helpers/base_query_wrapper'
import { baseQueryWithAuth } from '../helpers/query_with_auth'

export const tenantApi = createApi({
  reducerPath: 'api/tenant-features',
  baseQuery: baseQueryWithAuth(baseQueryWrapper(`${process.env.NEXT_PUBLIC_API_URL}/tenant`)),
  tagTypes: ['TenantCreation'],
  endpoints: (builder) => ({}),
})
