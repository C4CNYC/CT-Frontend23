/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { BaseListResponseInterface, BaseResponseInterface } from "@utils";
import {
  IFriend,
  IFriendsSearchParams,
} from "src/redux/interfaces/friends.interface";

import { managerApi } from ".";

const extendedApi = managerApi.injectEndpoints({
  endpoints: (builder) => ({
    getFriendsContent: builder.query<
      BaseListResponseInterface<IFriend & BaseResponseInterface>,
      IFriendsSearchParams
    >({
      query: (params) => ({
        url: "/student/classmates",
        method: "GET",
        params,
      }),
      keepUnusedDataFor: 0,
      providesTags: ["Friends"],
    }),
    getFriend: builder.query<IFriend & BaseResponseInterface, { id: string }>({
      query: ({ id }) => ({
        url: `/student/classmates/${id}`,
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
