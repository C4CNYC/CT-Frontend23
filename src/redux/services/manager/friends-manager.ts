import { IFriend, IFriendsSearchParams } from '@/redux/interfaces/friends.interface'
import { BaseListResponseInterface, BaseResponseInterface } from '@/utils'

import { managerApi } from '.'

const extendedApi = managerApi.injectEndpoints({
  endpoints: (builder) => ({
    getFriendsStudentContent: builder.query<
      BaseListResponseInterface<IFriend & BaseResponseInterface>,
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
    getFriend: builder.query<IFriend & BaseResponseInterface, { id: string }>({
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
