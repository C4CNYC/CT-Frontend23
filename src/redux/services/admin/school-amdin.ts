/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { BaseListResponseInterface, BaseResponseInterface } from "@utils";

import { adminApi } from ".";
import {
  AddTeacherRequest,
  ClassListReponce,
  ClassRequest,
  ClassResponce,
  ISchool,
  ISchoolSearchParams,
  OrganizationSchoolRequest,
  OrganizationSchoolResponse,
} from "../interfaces/school.interface";
import { IUser } from "../interfaces/user.interface";

const extendedApi = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    createClass: builder.mutation<ClassResponce, Omit<ClassRequest, "classId">>(
      {
        query: ({ schoolId, ...body }) => ({
          url: `/school/${schoolId}/class`,
          method: "POST",
          body,
        }),
        invalidatesTags: [{ type: "Classes" }],
      }
    ),
    updateClass: builder.mutation<ClassResponce, ClassRequest>({
      query: ({ schoolId, classId, ...body }) => ({
        url: `/school/${schoolId}/class/${classId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "Classes" }],
    }),
    deleteClass: builder.mutation<
      ClassResponce,
      {
        schoolId: string;
        classId: string;
      }
    >({
      query: ({ schoolId, classId }) => ({
        url: `/school/${schoolId}/class/${classId}`,
        method: "DELETE",
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
  }),
});

export const {
  useGetClassListQuery,
  useGetSchoolListQuery,
  useGetTeacherListQuery,
  useUpdateSchoolCoverMutation,
  useUpdateClassMutation,
  useCreateClassMutation,
  useDeleteTeacherMutation,
  useAddTeacherMutation,
  useCreateOrganizationSchoolMutation,
} = extendedApi;
