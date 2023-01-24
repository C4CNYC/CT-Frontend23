import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseResponseInterface } from "src/utils/baseResponce.interface";
import { baseQueryWrapper } from "./helpers/base_query_wrapper";
import { baseQueryWithAuth } from "./helpers/query_with_auth";

export interface OrganizationResponce extends BaseResponseInterface {
  name: string;
  web: string;
}

export interface OrganizationRequest {
  name: string;
  web: string;
}

export const adminApi = createApi({
  reducerPath: "api/admin",
  baseQuery: baseQueryWithAuth(
    baseQueryWrapper(`${process.env.NEXT_PUBLIC_API_URL}`)
  ),
  endpoints: (builder) => ({
    // -------------- organization -------------------
    getOrganization: builder.query<OrganizationResponce, { id: string }>({
      query: (data) => ({
        url: `/org/${data.id}`,
        method: "GET",
      }),
    }),
    createOrganization: builder.mutation<
      OrganizationResponce,
      OrganizationRequest
    >({
      query: (body) => ({
        url: "/org",
        method: "POST",
        body,
      }),
    }),
    updateOrganization: builder.mutation<
      OrganizationResponce,
      {
        id: string;
        body: OrganizationRequest;
      }
    >({
      query: (data) => ({
        url: `/org/${data.id}`,
        method: "PATCH",
        body: data.body,
      }),
    }),
  }),
});

export const {
  useCreateOrganizationMutation,
  useGetOrganizationQuery,
  useUpdateOrganizationMutation,
} = adminApi;
