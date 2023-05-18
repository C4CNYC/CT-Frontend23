/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi } from "@reduxjs/toolkit/query/react";
import { BaseResponseInterface } from "src/utils/baseResponce.interface";
import { baseQueryWrapper } from "./helpers/base_query_wrapper";
import { baseQueryWithAuth } from "./helpers/query_with_auth";
import { IStudentProfile } from "./interfaces/user.interface";

export interface User extends BaseResponseInterface {
  avatar: string;
  email: string;
  name: string;
}

export interface UserResponse {
  user: User;
  access_token: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface TenantResponce extends BaseResponseInterface {
  name: string;
}

export interface TenantRequest {
  name: string;
}

export interface RegisterResponce extends BaseResponseInterface {
  access_token: string;
  user: User;
}

export interface RegisterRequest {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

export const authApi = createApi({
  reducerPath: "api/auth",
  baseQuery: baseQueryWithAuth(
    baseQueryWrapper(`${process.env.NEXT_PUBLIC_API_URL}/auth`)
  ),
  tagTypes: ["ProfileUser"],
  endpoints: (builder) => ({
    createTenant: builder.mutation<TenantResponce, TenantRequest>({
      query: (body) => ({
        url: "tenant",
        method: "POST",
        body,
      }),
    }),
    register: builder.mutation<RegisterResponce, RegisterRequest>({
      query: (body) => ({
        url: "auth/signup",
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: "auth/signin",
        method: "POST",
        body: credentials,
      }),
    }),
    profile: builder.query<User, void>({
      query: () => ({
        url: "/profile",
        method: "GET",
      }),
      providesTags: ["ProfileUser"],
    }),
    updateProfile: builder.mutation<IStudentProfile, IStudentProfile>({
      query: ({ ...body }) => ({
        url: "/profile",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["ProfileUser"],
    }),
    udpateProfileAvatar: builder.mutation<void, { file: FormData }>({
      query: ({ file }) => ({
        url: "/profile/avatar",
        method: "PATCH",
        body: file,
      }),
      invalidatesTags: ["ProfileUser"],
    }),
    protected: builder.mutation<{ message: string }, void>({
      query: () => "protected",
    }),
  }),
});

export const {
  useCreateTenantMutation,
  useRegisterMutation,
  useLoginMutation,
  useProtectedMutation,
  useProfileQuery,
  usePrefetch,
  useUdpateProfileAvatarMutation,
  useUpdateProfileMutation,
} = authApi;
