/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { BaseListResponseInterface, BaseResponseInterface } from "@utils";
import {
  IFriend,
  IFriendsSearchParams,
} from "src/redux/interfaces/friends.interface";

import { studentApi } from ".";

const extendedApi = studentApi.injectEndpoints({
  endpoints: (builder) => ({
    getFriendsStudentContent: builder.query<
      BaseListResponseInterface<IFriend & BaseResponseInterface>,
      IFriendsSearchParams
    >({
      query: (params) => ({
        url: "/classmates",
        method: "GET",
        params,
      }),
      keepUnusedDataFor: 0,
      providesTags: ["Friends"],
    }),
    getFriend: builder.query<IFriend & BaseResponseInterface, { id: string }>({
      query: ({ id }) => ({
        url: `/classmates/${id}`,
        method: "GET",
      }),
      keepUnusedDataFor: 0,
      providesTags: ["Friends"],
    }),
  }),
});

export const {
  useGetFriendsStudentContentQuery,
  useGetFriendQuery,
  // -------------mutation-----------
} = extendedApi;
