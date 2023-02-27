/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi } from "@reduxjs/toolkit/query/react";
import { BaseResponseInterface } from "src/utils/baseResponce.interface";
import { baseQueryWrapper } from "./helpers/base_query_wrapper";
import { baseQueryWithAuth } from "./helpers/query_with_auth";

export interface User extends BaseResponseInterface {
  email: string;
  name: string;
  role: string;
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
        url: "auth/profile",
        method: "GET",
      }),
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
} = authApi;
