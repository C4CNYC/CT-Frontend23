import { createApi } from "@reduxjs/toolkit/query/react";
import { BaseResponseInterface } from "src/utils/baseResponce.interface";
import { baseQueryWrapper } from "./helpers/base_query_wrapper";
import { baseQueryWithAuth } from "./helpers/query_with_auth";
import {
  OrganizationResponce,
  OrganizationListResponce,
  OrganizationRequest,
} from "./interfaces/organization.interface";
import {
  AddTeacherRequest,
  ClassListReponce,
  ClassRequest,
  ClassResponce,
  OrganizationSchoolRequest,
  OrganizationSchoolResponse,
  SchoolListResponce,
  SchoolRequest,
} from "./interfaces/school.interface";
import {
  CreateUserRequest,
  IUser,
  UpdateUserRequest,
  UserListResponse,
  UserSearchParams,
} from "./interfaces/user.interface";

export const adminApi = createApi({
  reducerPath: "api/admin",
  baseQuery: baseQueryWithAuth(
    baseQueryWrapper(`${process.env.NEXT_PUBLIC_API_URL}/admin`)
  ),
  tagTypes: ["Organization", "School", "Members", "Teachers", "Classes"],
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
    createClass: builder.mutation<ClassResponce, ClassRequest>({
      query: ({ schoolId, org_id, ...body }) => ({
        url: `/org/${org_id}/school/${schoolId}/class`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Classes" }],
    }),
    getSchoolList: builder.query<SchoolListResponce, SchoolRequest>({
      query: ({ id, ...params }) => ({
        url: `/org/${id}/school`,
        method: "GET",
        params,
      }),
      providesTags: ["School"],
    }),
    deleteTeacher: builder.mutation<void, AddTeacherRequest>({
      query: ({ org_id, school_id, ...body }) => ({
        url: `/org/${org_id}/school/${school_id}/teacher`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: [{ type: "Teachers" }],
    }),
    addTeacher: builder.mutation<void, AddTeacherRequest>({
      query: ({ org_id, school_id, ...body }) => ({
        url: `/org/${org_id}/school/${school_id}/teacher`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Teachers" }],
    }),
    getTeacherList: builder.query<
      (IUser & BaseResponseInterface)[],
      { id: string; school_id: string }
    >({
      query: ({ id, school_id }) => ({
        url: `/org/${id}/school/${school_id}/teacher`,
        method: "GET",
      }),
      providesTags: ["Teachers"],
    }),
    getClassList: builder.query<
      ClassListReponce[],
      { id: string; school_id: string }
    >({
      query: ({ id, school_id }) => ({
        url: `/org/${id}/school/${school_id}/class`,
        method: "GET",
      }),
      providesTags: ["Classes"],
    }),
    createOrganizationSchool: builder.mutation<
      OrganizationSchoolResponse,
      OrganizationSchoolRequest
    >({
      query: ({ org_id, ...body }) => ({
        url: `/org/${org_id}/school`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "School" }],
    }),
    // ------------ members ------------------
    createOrgMember: builder.mutation<
      IUser & BaseResponseInterface,
      CreateUserRequest
    >({
      query: ({ org_id, ...body }) => ({
        url: `/org/${org_id}/user`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Members" }],
    }),
    updateOrgMember: builder.mutation<
      IUser & BaseResponseInterface,
      UpdateUserRequest
    >({
      query: ({ org_id, user_id, ...body }) => ({
        url: `/org/${org_id}/user/${user_id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "Members" }],
    }),
    getOrgMember: builder.query<
      IUser & BaseResponseInterface,
      { org_id: string; user_id: string }
    >({
      query: ({ org_id, user_id }) => ({
        url: `org/${org_id}/user/${user_id}`,
        method: "GET",
      }),
      providesTags: ["Members"],
    }),
    getOrgMembers: builder.query<
      UserListResponse<IUser & BaseResponseInterface>,
      UserSearchParams
    >({
      query: ({ org_id, ...params }) => ({
        url: `org/${org_id}/user`,
        method: "GET",
        params,
      }),
      providesTags: ["Members"],
    }),
  }),
});

export const {
  // ------------ query ---------------
  useGetClassListQuery,
  useGetOrgMemberQuery,
  useGetOrgMembersQuery,
  useGetSchoolListQuery,
  useGetTeacherListQuery,
  useGetOrganizationListQuery,
  useGetOrganizationQuery,
  // ---------------- mutations ---------
  useCreateClassMutation,
  useDeleteTeacherMutation,
  useAddTeacherMutation,
  useUpdateOrgMemberMutation,
  useCreateOrgMemberMutation,
  useCreateOrganizationMutation,
  useUpdateOrganizationMutation,
  useCreateOrganizationSchoolMutation,
} = adminApi;
