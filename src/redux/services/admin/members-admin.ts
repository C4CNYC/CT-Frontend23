/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { BaseResponseInterface } from "@utils";

import { adminApi } from ".";
import { DeleteMemberRequest } from "../interfaces/school.interface";
import {
  CreateUserRequest,
  IUser,
  UpdateUserRequest,
  UserListResponse,
  UserSearchParams,
} from "../interfaces/user.interface";

const extendedApi = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrgMember: builder.mutation<
      IUser & BaseResponseInterface,
      CreateUserRequest
    >({
      query: ({ ...body }) => ({
        url: "/org/user",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Members" }],
    }),
    udpateMemberAvatar: builder.mutation<
      IUser & BaseResponseInterface,
      { user_id: string; file: FormData }
    >({
      query: ({ user_id, file }) => ({
        url: `/org/user/${user_id}/avatar`,
        method: "PATCH",
        body: file,
      }),
      invalidatesTags: [{ type: "Members" }],
    }),
    updateOrgMember: builder.mutation<
      IUser & BaseResponseInterface,
      UpdateUserRequest
    >({
      query: ({ user_id, ...body }) => ({
        url: `/org/user/${user_id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "Members" }],
    }),
    getOrgMember: builder.query<
      IUser & BaseResponseInterface,
      { user_id: string }
    >({
      query: ({ user_id }) => ({
        url: `org/user/${user_id}`,
        method: "GET",
      }),
      providesTags: ["Members"],
    }),
    getOrgMembers: builder.query<
      UserListResponse<IUser & BaseResponseInterface>,
      UserSearchParams
    >({
      query: ({ ...params }) => ({
        url: "org/user",
        method: "GET",
        params,
      }),
      providesTags: ["Members"],
    }),
    deleteOrgMember: builder.mutation<void, DeleteMemberRequest>({
      query: ({ user_id, ...body }) => ({
        url: `org/user/${user_id}/`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: [{ type: "Members" }],
    }),
  }),
});

export const {
  useGetOrgMemberQuery,
  useGetOrgMembersQuery,
  useUdpateMemberAvatarMutation,
  useUpdateOrgMemberMutation,
  useCreateOrgMemberMutation,
  useDeleteOrgMemberMutation,
} = extendedApi;
