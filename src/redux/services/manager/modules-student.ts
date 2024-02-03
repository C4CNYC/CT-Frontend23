import { BaseListResponseInterface, BaseResponseInterface } from '@/lib/utils'
import { IModule, IModulesSearchParams } from '@/redux/interfaces/content.interface'

import { managerApi } from '.'

const extendedApi = managerApi.injectEndpoints({
  endpoints: (builder) => ({
    getModuleWithLessons: builder.query<IModule & BaseResponseInterface, { id: string }>({
      query: ({ id }) => ({
        url: `/student/module/${id}`,
        method: 'GET',
      }),
    }),
    getModulesList: builder.query<
      BaseListResponseInterface<IModule & BaseResponseInterface>,
      IModulesSearchParams
    >({
      query: (params) => ({
        url: '/student/content/module',
        method: 'GET',
        params,
      }),
      keepUnusedDataFor: 0,
      providesTags: ['Modules'],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetModuleWithLessonsQuery,
  useGetModulesListQuery,
  // -------------mutation-----------
} = extendedApi
