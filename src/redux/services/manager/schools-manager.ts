/* eslint-disable @typescript-eslint/no-invalid-void-type */
import {
  BaseListResponseInterface,
  BaseResponseInterface,
} from "src/utils/baseResponce.interface";
import { managerApi } from ".";
import {
  ISchool,
  ISchoolSearchParams,
  SchoolContacts,
  SchoolProfile,
  SchoolSettings,
  SchoolSocials,
} from "../interfaces/school.interface";

const extendedApi = managerApi.injectEndpoints({
  endpoints: (builder) => ({
    getMySchools: builder.query<
      BaseListResponseInterface<ISchool>,
      ISchoolSearchParams
    >({
      query: (params) => ({
        url: "/school",
        method: "GET",
        params,
      }),
      providesTags: ["School"],
    }),
    updateSchoolProfile: builder.mutation<
      SchoolProfile & BaseResponseInterface,
      SchoolProfile
    >({
      query: ({ schoolId, ...body }) => ({
        url: `school/${schoolId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "School" }],
    }),
    getSchoolProfile: builder.query<
      SchoolProfile & BaseResponseInterface,
      { schoolId: string }
    >({
      query: ({ schoolId }) => ({
        url: `/school/${schoolId}`,
        method: "GET",
      }),
      providesTags: ["School"],
    }),
    updateSchoolSettings: builder.mutation<
      SchoolSettings & BaseResponseInterface,
      SchoolSettings
    >({
      query: ({ schoolId, ...body }) => ({
        url: `/school/${schoolId}/setting/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "SchoolSettings" }],
    }),
    getSchoolSettings: builder.query<
      SchoolSettings & BaseResponseInterface,
      { schoolId: string }
    >({
      query: ({ schoolId }) => ({
        url: `/school/${schoolId}/setting/`,
        method: "GET",
      }),
      providesTags: ["SchoolSettings"],
    }),
    updateSchoolContacts: builder.mutation<
      SchoolContacts & BaseResponseInterface,
      SchoolContacts
    >({
      query: ({ schoolId, ...body }) => ({
        url: `/school/${schoolId}/contact/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "SchoolContacts" }],
    }),
    getSchoolContacts: builder.query<
      SchoolContacts & BaseResponseInterface,
      { schoolId: string }
    >({
      query: ({ schoolId }) => ({
        url: `/school/${schoolId}/contact/`,
        method: "GET",
      }),
      providesTags: ["SchoolContacts"],
    }),
    createSchoolSocial: builder.mutation<
      SchoolSocials & BaseResponseInterface,
      {
        schoolId: string;
        type?: string;
        name?: string;
        link?: string;
        socialID: string;
      }
    >({
      query: ({ schoolId, ...body }) => ({
        url: `/school/${schoolId}/social`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "School" }],
    }),
    deleteSchoolSocial: builder.mutation<
      SchoolSocials & BaseResponseInterface,
      { schoolId: string; socialID: string }
    >({
      query: ({ schoolId, socialID }) => ({
        url: `/school/${schoolId}/social/${socialID}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "School" }],
    }),
    updateSchoolSocial: builder.mutation<
      SchoolSocials & BaseResponseInterface,
      { schoolId: string; socialID: string; link?: string; type?: string }
    >({
      query: ({ schoolId, socialID, ...body }) => ({
        url: `/school/${schoolId}/social/${socialID}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "School" }],
    }),
    updateSchoolCoverImg: builder.mutation<
      void,
      {
        id: string;
        file: FormData;
      }
    >({
      query: ({ id, file }) => ({
        url: `/school/${id}/cover`,
        method: "PATCH",
        body: file,
      }),
      invalidatesTags: [{ type: "School" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetSchoolContactsQuery,
  useGetSchoolProfileQuery,
  useGetSchoolSettingsQuery,
  useGetMySchoolsQuery,
  // -------------mutation-----------
  useUpdateSchoolCoverImgMutation,
  useCreateSchoolSocialMutation,
  useDeleteSchoolSocialMutation,
  useUpdateSchoolContactsMutation,
  useUpdateSchoolSocialMutation,
  useUpdateSchoolSettingsMutation,
  useUpdateSchoolProfileMutation,
} = extendedApi;
