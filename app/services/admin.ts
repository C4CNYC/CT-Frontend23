import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { url } from "inspector";
import { RootState } from "../store";
import { baseQueryWrapper } from "./helpers/base_query_wrapper";
import { baseQueryWithAuth } from "./helpers/query_with_auth";

export interface User {
  first_name: string;
  last_name: string;
}

export interface UserResponse {
  user: User;
  access_token: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export const adminApi = createApi({
  reducerPath: "api/admin",
  baseQuery: baseQueryWithAuth(
    baseQueryWrapper(`${process.env.NEXT_PUBLIC_API_URL}/admin`)
  ),
  endpoints: (builder) => ({
    getUsers: builder.query<UserResponse, void>({
      query: () => ({
        url: "users",
        method: "GET",
      }),
    }),
    getTeams: builder.query<any, any>({
      query: () => ({
        url: "team",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUsersQuery, useGetTeamsQuery } = adminApi;
