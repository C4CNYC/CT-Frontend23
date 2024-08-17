import { BaseListResponseInterface, BaseResponseInterface } from '@/utils'

import { IModule, IModulesSearchParams } from '../interfaces/courseUnits.interface'

import { adminApi } from '.'

const extendedApi = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminModules: builder.query<
      BaseListResponseInterface<IModule & BaseResponseInterface>,
      IModulesSearchParams
    >({
      query: (params) => ({
        url: '/module',
        method: 'GET',
        params,
      }),
      keepUnusedDataFor: 0,
      providesTags: ['Modules'],
    }),
    getAdminOwnModules: builder.query<
      BaseListResponseInterface<IModule & BaseResponseInterface>,
      IModulesSearchParams
    >({
      query: (params) => ({
        url: '/module/own',
        method: 'GET',
        params,
      }),
      keepUnusedDataFor: 0,
      providesTags: ['Modules'],
    }),
  }),
  overrideExisting: false,
})

export const { useGetAdminModulesQuery, useGetAdminOwnModulesQuery } = extendedApi
