/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi } from "@reduxjs/toolkit/query/react";
import {
  BaseListResponseInterface,
  BaseResponseInterface,
} from "src/utils/baseResponce.interface";
import { baseQueryWrapper } from "./helpers/base_query_wrapper";
import { baseQueryWithAuth } from "./helpers/query_with_auth";
import {
  CustomizationResponce,
  IContacts,
  ICustomization,
  ISendInvite,
  ISettings,
  ISubmitInvite,
  OrganizationRequest,
  OrganizationResponce,
} from "./interfaces/organization.interface";
import {
  AddTeacherRequest,
  ClassListReponce,
  ClassRequest,
  ClassResponce,
  DeleteMemberRequest,
  ISchool,
  ISchoolSearchParams,
  OrganizationSchoolRequest,
  OrganizationSchoolResponse,
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
  tagTypes: [
    "Organization",
    "School",
    "Members",
    "Teachers",
    "Classes",
    "OrganizationContacts",
    "OrganizationSettings",
    "OrganizationCustomization",
  ],
  endpoints: (builder) => ({
    // -------------- organization -------------------
    getOrganization: builder.query<OrganizationResponce, void>({
      query: () => ({
        url: "/org",
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
        url: "/org",
        method: "PATCH",
        body: data.body,
      }),
      invalidatesTags: [{ type: "Organization" }],
    }),
    updateOrgAvatar: builder.mutation<
      void,
      {
        file: FormData;
      }
    >({
      query: ({ file }) => ({
        url: "/org/avatar",
        method: "PATCH",
        headers: {
          // "Content-Type": "multipart/form-data",
        },
        body: file,
      }),
      invalidatesTags: [{ type: "Organization" }],
    }),
    updateOrgCover: builder.mutation<
    void,
      {
        file: FormData;
      }
    >({
      query: ({ file }) => ({
        url: "/org/cover",
        method: "PATCH",
        body: file,
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
    updateClass: builder.mutation<
      ClassResponce,
      { schoolId: string; classId: string; name: string }
    >({
      query: ({ schoolId, classId, ...body }) => ({
        url: `/school/${schoolId}/class/${classId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "Classes" }],
    }),
    getSchoolList: builder.query<
      BaseListResponseInterface<ISchool>,
      ISchoolSearchParams
    >({
      query: ({ ...params }) => ({
        url: "/school",
        method: "GET",
        params,
      }),
      providesTags: ["School"],
    }),
    deleteTeacher: builder.mutation<void, AddTeacherRequest>({
      query: ({ schoolId, ...body }) => ({
        url: `/school/${schoolId}/teacher`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: [{ type: "Teachers" }],
    }),
    addTeacher: builder.mutation<void, AddTeacherRequest>({
      query: ({ schoolId, ...body }) => ({
        url: `/school/${schoolId}/teacher`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Teachers" }],
    }),
    getTeacherList: builder.query<
      BaseListResponseInterface<IUser & BaseResponseInterface>,
      { schoolId: string }
    >({
      query: ({ schoolId }) => ({
        url: `/school/${schoolId}/teacher`,
        method: "GET",
      }),
      providesTags: ["Teachers"],
    }),
    getClassList: builder.query<ClassListReponce[], { schoolId: string }>({
      query: ({ schoolId }) => ({
        url: `/school/${schoolId}/class`,
        method: "GET",
      }),
      providesTags: ["Classes"],
    }),
    createOrganizationSchool: builder.mutation<
      OrganizationSchoolResponse,
      OrganizationSchoolRequest
    >({
      query: ({ ...body }) => ({
        url: "/school",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "School" }],
    }),
    updateSchoolCover: builder.mutation<
    void,
      {
        file: FormData;
      }
    >({
      query: ({ file }) => ({
        url: "/school/cover",
        method: "PATCH",
        body: file,
      }),
      invalidatesTags: [{ type: "School" }],
    }),
    // ------------ members ------------------
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
    updateOrgContacts: builder.mutation<
      IContacts & BaseResponseInterface,
      IContacts
    >({
      query: ({ ...body }) => ({
        url: "/org/contact/",
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "OrganizationContacts" }],
    }),
    getOrgContacts: builder.query<IContacts & OrganizationResponce, void>({
      query: () => ({
        url: "/org/contact/",
        method: "GET",
      }),
      providesTags: ["OrganizationContacts"],
    }),
    updateOrgSettings: builder.mutation<
      ISettings & BaseResponseInterface,
      ISettings
    >({
      query: ({ ...body }) => ({
        url: "/org/setting/",
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "OrganizationSettings" }],
    }),
    getOrgSettings: builder.query<ISettings & OrganizationResponce, void>({
      query: () => ({
        url: "/org/setting/",
        method: "GET",
      }),
      providesTags: ["OrganizationSettings"],
    }),
    updateOrgCustomization: builder.mutation<
      ICustomization & BaseResponseInterface,
      ICustomization
    >({
      query: ({ ...body }) => ({
        url: "/org/custom/",
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "OrganizationCustomization" }],
    }),
    getOrgCustomization: builder.query<CustomizationResponce, void>({
      query: () => ({
        url: "/org/custom/",
        method: "GET",
      }),
      providesTags: ["OrganizationCustomization"],
    }),
    inviteSubmit: builder.mutation<
      ISubmitInvite & BaseResponseInterface,
      ISubmitInvite
    >({
      query: ({ ...body }) => ({
        url: "/org/user/submitInvite",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Organization" }],
    }),
    sendInvite: builder.mutation<
      ISendInvite & BaseResponseInterface,
      ISendInvite
    >({
      query: ({ ...body }) => ({
        url: "/org/user/invite",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Teachers" }],
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
  useUdpateMemberAvatarMutation,
  useUpdateOrgAvatarMutation,
  useUpdateOrgCoverMutation,
  useUpdateSchoolCoverMutation,
  useUpdateClassMutation,
  useCreateClassMutation,
  useDeleteTeacherMutation,
  useAddTeacherMutation,
  useUpdateOrgMemberMutation,
  useCreateOrgMemberMutation,
  useDeleteOrgMemberMutation,
  useCreateOrganizationMutation,
  useUpdateOrganizationMutation,
  useCreateOrganizationSchoolMutation,
  useUpdateOrgContactsMutation,
  useUpdateOrgSettingsMutation,
  useUpdateOrgCustomizationMutation,
  useInviteSubmitMutation,
  useSendInviteMutation,
} = adminApi;
