import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWrapper } from "./helpers/base_query_wrapper";
import { baseQueryWithAuth } from "./helpers/query_with_auth";

export interface User {
  createdAt: string;
  email: string;
  id: string;
  name: string;
  role: string;
  updatedAt: string;
}

export interface UserResponse {
  user: User;
  access_token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export const authApi = createApi({
  reducerPath: "api/auth",
  baseQuery: baseQueryWithAuth(
    baseQueryWrapper(`${process.env.NEXT_PUBLIC_API_URL}/auth`)
  ),
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: "signin",
        method: "POST",
        body: credentials,
      }),
    }),
    profile: builder.query<User, void>({
      query: () => ({
        url: "profile",
        method: "GET",
      }),
    }),
    protected: builder.mutation<{ message: string }, void>({
      query: () => "protected",
    }),
  }),
});

export const {
  useLoginMutation,
  useProtectedMutation,
  useProfileQuery,
  usePrefetch,
} = authApi;
