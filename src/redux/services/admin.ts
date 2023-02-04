import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { BaseResponseInterface } from "src/utils/baseResponce.interface";
import { baseQueryWrapper } from "./helpers/base_query_wrapper";
import { baseQueryWithAuth } from "./helpers/query_with_auth";
import {
  OrganizationResponce,
  OrganizationListResponce,
  OrganizationRequest,
  IContacts, ISettings, ICustomization
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
  tagTypes: ["Organization", "School", "Members", "Teachers", "Classes", "OrganizationContacts", "OrganizationSettings", "OrganizationCustomization"],
  endpoints: (builder) => ({
    // -------------- organization -------------------
    getOrganization: builder.query<OrganizationResponce, void>({
      query: () => ({
        url: `/org`,
        method: "GET",
      }),
      providesTags: ["Organization"],
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
        body: OrganizationRequest;
      }
    >({
      query: (data) => ({
        url: `/org`,
        method: "PATCH",
        body: data.body,
      }),
      invalidatesTags: [{ type: "Organization" }],
    }),
    // ------------ school ------------------
    createClass: builder.mutation<ClassResponce, ClassRequest>({
      query: ({ schoolId, ...body }) => ({
        url: `/school/${schoolId}/class`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Classes" }],
    }),
    getSchoolList: builder.query<SchoolListResponce, SchoolRequest>({
      query: ({ ...params }) => ({
        url: `/school`,
        method: "GET",
        params,
      }),
      providesTags: ["School"],
    }),
    deleteTeacher: builder.mutation<void, AddTeacherRequest>({
      query: ({ school_id, ...body }) => ({
        url: `/school/${school_id}/teacher`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: [{ type: "Teachers" }],
    }),
    addTeacher: builder.mutation<void, AddTeacherRequest>({
      query: ({ school_id, ...body }) => ({
        url: `/school/${school_id}/teacher`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Teachers" }],
    }),
    getTeacherList: builder.query<
      (IUser & BaseResponseInterface)[],
      { school_id: string }
    >({
      query: ({ school_id }) => ({
        url: `/school/${school_id}/teacher`,
        method: "GET",
      }),
      providesTags: ["Teachers"],
    }),
    getClassList: builder.query<ClassListReponce[], { school_id: string }>({
      query: ({ school_id }) => ({
        url: `/school/${school_id}/class`,
        method: "GET",
      }),
      providesTags: ["Classes"],
    }),
    createOrganizationSchool: builder.mutation<
      OrganizationSchoolResponse,
      OrganizationSchoolRequest
    >({
      query: ({ ...body }) => ({
        url: `/school`,
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
      query: ({ ...body }) => ({
        url: `/org/user`,
        method: "POST",
        body,
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
        url: `org/user`,
        method: "GET",
        params,
      }),
      providesTags: ["Members"],
    }),
    updateOrgContacts: builder.mutation<
      IContacts & BaseResponseInterface,
      IContacts
    >({
      query: ({ ...body }) => ({
        url: `/org/contact/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "OrganizationContacts" }],
    }),
    getOrgContacts: builder.query<
      IContacts & OrganizationResponce,
      IContacts
    >({
      query: () => ({
        url: `/org/contact/`,
        method: "GET",
      }),
      providesTags: ["OrganizationContacts"],
    }),
    updateOrgSettings: builder.mutation<
      ISettings & BaseResponseInterface,
      ISettings
    >({
      query: ({ ...body }) => ({
        url: `/org/setting/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "OrganizationSettings" }],
    }),
    getOrgSettings: builder.query<
      ISettings & OrganizationResponce,
      ISettings
    >({
      query: () => ({
        url: `/org/setting/`,
        method: "GET",
      }),
      providesTags: ["OrganizationSettings"],
    }),
    updateOrgCustomization: builder.mutation<
      ICustomization & BaseResponseInterface,
      ICustomization
    >({
      query: ({ ...body }) => ({
        url: `/org/custom/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "OrganizationCustomization" }],
    }),
    getOrgCustomization: builder.query<OrganizationResponce, void>({
      query: () => ({
        url: `/org/custom/`,
        method: "GET",
      }),
      providesTags: ["OrganizationCustomization"],
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
  useGetOrganizationQuery,
  useGetOrgContactsQuery,
  useGetOrgSettingsQuery,
  useGetOrgCustomizationQuery,
  // ---------------- mutations ---------
  useCreateClassMutation,
  useDeleteTeacherMutation,
  useAddTeacherMutation,
  useUpdateOrgMemberMutation,
  useCreateOrgMemberMutation,
  useCreateOrganizationMutation,
  useUpdateOrganizationMutation,
  useCreateOrganizationSchoolMutation,
  useUpdateOrgContactsMutation,
  useUpdateOrgSettingsMutation,
  useUpdateOrgCustomizationMutation,
} = adminApi;
