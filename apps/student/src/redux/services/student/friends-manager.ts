/* eslint-disable @typescript-eslint/no-invalid-void-type */

import {
  IFriend,
  IFriendsSearchParams,
} from "src/redux/interfaces/friends.interface";
import {
  BaseListResponseInterface,
  BaseResponseInterface,
} from "@ct-nx/utils";
import { studentApi } from ".";

const extendedApi = studentApi.injectEndpoints({
  endpoints: (builder) => ({
    getFriendsContent: builder.query<
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
  useGetFriendsContentQuery,
  useGetFriendQuery,
  // -------------mutation-----------
} = extendedApi;
