/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi } from "@reduxjs/toolkit/query/react";

import {
  IUser,
  LoginRequest,
  ManagerResponse,
  User,
  UserResponse,
} from "../interfaces/auth.interface";
import { baseQueryWrapper } from "./helpers/base_query_wrapper";
import { baseQueryWithAuth } from "./helpers/query_with_auth";

export const studentAuthApi = createApi({
  reducerPath: "api/student-auth",
  baseQuery: baseQueryWithAuth(
    baseQueryWrapper(`${process.env.NEXT_PUBLIC_API_URL}/student/auth`)
  ),
  tagTypes: ["Profile"],
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: "auth/signin",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation<
      UserResponse,
      {
        email: string;
        password: string;
        first_name: string;
        last_name: string;
        manager_id: string;
      }
    >({
      query: (credentials) => ({
        url: "/signup",
        method: "POST",
        body: credentials,
      }),
    }),
    registerManagerProfile: builder.mutation<
      ManagerResponse,
      { email: string; password: string; first_name: string; last_name: string }
    >({
      query: (body) => ({
        url: `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
        method: "POST",
        body,
      }),
    }),
    profileStudent: builder.query<User, any>({
      query: () => ({
        url: "/profile",
        method: "GET",
      }),
      providesTags: [{ type: "Profile" }],
    }),
    updateProfile: builder.mutation<IUser, IUser>({
      query: ({ ...body }) => ({
        url: "/profile",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Profile"],
    }),
    udpateProfileAvatar: builder.mutation<void, { file: FormData }>({
      query: ({ file }) => ({
        url: "/profile/avatar",
        method: "PATCH",
        body: file,
      }),
      invalidatesTags: ["Profile"],
    }),
    protected: builder.mutation<{ message: string }, void>({
      query: () => "protected",
    }),
    resetPassword: builder.mutation<void, { email: string }>({
      query: ({ ...body }) => ({
        url: "/reset-password",
        method: "POST",
        body,
      }),
    }),
    submitPassword: builder.mutation<void, { id: string; password: string }>({
      query: ({ ...body }) => ({
        url: "/submit-password",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useProfileStudentQuery,
  usePrefetch,
  // ---------mutation-----------
  useLoginMutation,
  useRegisterMutation,
  useProtectedMutation,
  useRegisterManagerProfileMutation,
  useResetPasswordMutation,
  useSubmitPasswordMutation,
  useUpdateProfileMutation,
  useUdpateProfileAvatarMutation,
} = studentAuthApi;
