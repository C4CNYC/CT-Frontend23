import { IFriendsSearchParams } from '@/redux/interfaces/friends.interface'
import { BaseListResponseInterface, BaseResponseInterface } from '@/utils'

import { IUser } from '../interfaces/user.interface'

import { managerApi } from '.'

const extendedApi = managerApi.injectEndpoints({
  endpoints: (builder) => ({
    getFriendsStudentContent: builder.query<
      BaseListResponseInterface<IUser & BaseResponseInterface>,
      IFriendsSearchParams
    >({
      query: (params) => ({
        url: '/student/classmates',
        method: 'GET',
        params,
      }),
      keepUnusedDataFor: 0,
      providesTags: ['Friends'],
    }),
    getFriend: builder.query<IUser & BaseResponseInterface, { id: string }>({
      query: ({ id }) => ({
        url: `/student/classmates/${id}`,
        method: 'GET',
      }),
      keepUnusedDataFor: 0,
      providesTags: ['Friends'],
    }),
  }),
})

export const {
  useGetFriendsStudentContentQuery,
  useGetFriendQuery,
  // -------------mutation-----------
} = extendedApi
