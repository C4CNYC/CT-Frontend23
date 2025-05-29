import { createApi } from '@reduxjs/toolkit/query/react'

import { IClass } from '@/redux/interfaces/class.interface'
import { BaseResponseInterface } from '@/utils/baseResponse.interface'

import { baseQueryWrapper } from '../helpers/base_query_wrapper'
import { IAdministration } from '../interfaces/administration'

export const publicApi = createApi({
  reducerPath: 'api/',
  baseQuery: baseQueryWrapper(`${process.env.NEXT_PUBLIC_API_URL}/`),
  tagTypes: [],
  endpoints: (builder) => ({
    getPublicTribe: builder.query<IClass & BaseResponseInterface, { joinCode: string }>({
      query: ({ joinCode }) => ({
        url: `class/${joinCode}`,
        method: 'GET',
      }),
    }),
    getOrgHomePage: builder.query<IAdministration & BaseResponseInterface, { tenantName: string }>({
      query: ({ tenantName }) => ({
        url: `tenant/${tenantName}/home-page`,
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetPublicTribeQuery, useGetOrgHomePageQuery } = publicApi
