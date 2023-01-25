import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseResponseInterface } from "src/utils/baseResponce.interface";
import { baseQueryWrapper } from "./helpers/base_query_wrapper";
import { baseQueryWithAuth } from "./helpers/query_with_auth";

export interface OrganizationResponce extends BaseResponseInterface {
  name: string;
  email: string;
  url: string;
  address: string;
}

export interface OrganizationListResponce {
  data: OrganizationResponce[];
  meta: {};
}

export interface OrganizationRequest {
  name: string;
  email: string | null;
  url: string;
  address: string;
}

export interface SchoolResponce extends BaseResponseInterface {
  name: string;
  city: string;
  country: string;
}

export interface SchoolListResponce {
  data: SchoolResponce[];
  meta: {};
}

export interface SchoolRequest {
  id: string;
  name?: string;
}

export interface OrganizationSchoolRequest {
  org_Id: string;
  name: string;
  city: string;
  country: string;
}
export interface OrganizationSchoolResponse extends BaseResponseInterface {
  name: string;
  city: string;
  country: string;
}

export const adminApi = createApi({
  reducerPath: "api/admin",
  baseQuery: baseQueryWithAuth(
    baseQueryWrapper(`${process.env.NEXT_PUBLIC_API_URL}/admin`)
  ),
  tagTypes: ["Organization", "School"],
  endpoints: (builder) => ({
    // -------------- organization -------------------
    getOrganization: builder.query<OrganizationResponce, { id: string }>({
      query: (data) => ({
        url: `/org/${data.id}`,
        method: "GET",
      }),
      providesTags: ["Organization"],
    }),
    getOrganizationList: builder.query<OrganizationListResponce, void>({
      query: () => ({
        url: `/org`,
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
      invalidatesTags: [{ type: "Organization" }],
    }),
    // ------------ school ------------------
    getSchoolList: builder.query<SchoolListResponce, SchoolRequest>({
      query: ({ id, ...params }) => ({
        url: `/org/${id}/school`,
        method: "GET",
        params,
      }),
      providesTags: ["School"],
    }),
    createOrganizationSchool: builder.mutation<
      OrganizationSchoolResponse,
      OrganizationSchoolRequest
    >({
      query: ({ org_Id, ...body }) => ({
        url: `/org/${org_Id}/school`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "School" }],
    }),
  }),
});

export const {
  useGetSchoolListQuery,
  useCreateOrganizationSchoolMutation,
  useGetOrganizationListQuery,
  useCreateOrganizationMutation,
  useGetOrganizationQuery,
  useUpdateOrganizationMutation,
} = adminApi;
