import { createApi } from "@reduxjs/toolkit/query/react";
import {
  BaseListResponseInterface,
  BaseResponseInterface
} from "src/utils/baseResponce.interface";
import { baseQueryWrapper } from "./helpers/base_query_wrapper";
import { baseQueryWithAuth } from "./helpers/query_with_auth";
import {
  IAssignment,
  IAssignmentUpdate,
  IAssignmentCreate
} from "./interfaces/assignment.interface";
import {
  ClassSearchParams,
  IClass,
  IModule,
  IModuleCreate,
  IModuleDelete,
  ILessonDelete,
  ILesson,
  ILessonCreate
} from "./interfaces/class.interface";
import {
  SchoolResponce,
  SchoolProfile,
  SchoolContacts,
  SchoolSocials,
  SchoolSettings
} from "./interfaces/school.interface";
import { IStudent, StudentSearchParams } from "./interfaces/user.interface";
import { User } from "./auth";

export const managerApi = createApi({
  reducerPath: "api/manager",
  baseQuery: baseQueryWithAuth(
    baseQueryWrapper(`${process.env.NEXT_PUBLIC_API_URL}/manager`)
  ),
  tagTypes: [
    "School",
    "Students",
    "Classes",
    "SchoolSettings",
    "SchoolContacts",
    "Assignments",
    "Assignment",
    "Modules",
    "Lessons"
  ],
  endpoints: (builder) => ({
    getAssignment: builder.query<
      IAssignment & BaseResponseInterface,
      { school_id: string; assignment_id: string }
    >({
      query: ({ school_id, assignment_id }) => ({
        url: `/school/${school_id}/assignment/${assignment_id}`,
        method: "GET"
      }),
      providesTags: ["Assignment"]
    }),
    getAssignmentList: builder.query<
      (IAssignment & BaseResponseInterface)[],
      { school_id: string }
    >({
      query: ({ school_id }) => ({
        url: `/school/${school_id}/assignment`,
        method: "GET"
      }),
      providesTags: ["Assignments"]
    }),
    createAssignment: builder.mutation<
      IAssignment & BaseResponseInterface,
      {
        school_id: string;
      } & IAssignmentCreate
    >({
      query: ({ school_id, ...body }) => ({
        url: `/school/${school_id}/assignment/`,
        method: "POST",
        body
      }),
      invalidatesTags: ["Assignments"]
    }),
    udpateAssignment: builder.mutation<
      void,
      {
        assignment_id: string;
        school_id: string;
      } & IAssignmentUpdate
    >({
      query: ({ school_id, assignment_id, ...body }) => ({
        url: `/school/${school_id}/assignment/${assignment_id}`,
        method: "PATCH",
        body
      }),
      invalidatesTags: ["Assignments", "Assignment"]
    }),
    deleteAssignment: builder.mutation<
      void,
      { school_id: string; assignment_id: string }
    >({
      query: ({ school_id, assignment_id }) => ({
        url: `/school/${school_id}/assignment/${assignment_id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Assignments"]
    }),
    getMySchools: builder.query<
      BaseListResponseInterface<SchoolResponce>,
      void
    >({
      query: () => ({
        url: `/school`,
        method: "GET"
      }),
      providesTags: ["School"]
    }),
    getStudent: builder.query<
      IStudent & BaseResponseInterface,
      { school_id: string; student_id: string }
    >({
      query: ({ school_id, student_id }) => ({
        url: `/school/${school_id}/student/${student_id}`,
        method: "GET"
      }),
      providesTags: ["Students"]
    }),
    getStudents: builder.query<
      BaseListResponseInterface<IStudent & BaseResponseInterface>,
      { school_id: string } & StudentSearchParams
    >({
      query: ({ school_id, ...params }) => ({
        url: `/school/${school_id}/student`,
        method: "GET",
        params
      }),
      providesTags: ["Students"]
    }),
    createStudent: builder.mutation<void, { school_id: string } & IStudent>({
      query: ({ school_id, ...body }) => ({
        url: `/school/${school_id}/student`,
        method: "POST",
        body
      }),
      invalidatesTags: ["Students", "School"]
    }),
    updateStudent: builder.mutation<
      void,
      { school_id: string; student_id: string } & Omit<IStudent, "email">
    >({
      query: ({ school_id, student_id, ...body }) => ({
        url: `/school/${school_id}/student/${student_id}`,
        method: "PATCH",
        body
      }),
      invalidatesTags: ["Students"]
    }),
    studentJoinClass: builder.mutation<
      void,
      { school_id: string; class_id: string; student_id: string }
    >({
      query: ({ school_id, class_id, ...body }) => ({
        url: `/school/${school_id}/class/${class_id}/student`,
        method: "POST",
        body
      }),
      invalidatesTags: ["Students"]
    }),
    studentLeftClass: builder.mutation<
      void,
      { school_id: string; class_id: string; student_id: string }
    >({
      query: ({ school_id, class_id, ...body }) => ({
        url: `/school/${school_id}/class/${class_id}/student`,
        method: "DELETE",
        body
      }),
      invalidatesTags: ["Students"]
    }),
    deleteStudent: builder.mutation<
      void,
      { school_id: string; student_id: string }
    >({
      query: ({ school_id, student_id }) => ({
        url: `/school/${school_id}/student/${student_id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Students"]
    }),
    // --------------------- classes --------------------------
    getClasses: builder.query<
      BaseListResponseInterface<IClass & BaseResponseInterface>,
      { school_id: string } & ClassSearchParams
    >({
      query: ({ school_id, ...params }) => ({
        url: `/school/${school_id}/class`,
        method: "GET",
        params
      }),
      providesTags: ["Classes"]
    }),
    createClasses: builder.mutation<void, { school_id: string; name: string }>({
      query: ({ school_id, ...body }) => ({
        url: `/school/${school_id}/class`,
        method: "POST",
        body
      }),
      invalidatesTags: ["Classes"]
    }),
    updateClasses: builder.mutation<
      void,
      { school_id: string; class_id: string; name: string }
    >({
      query: ({ school_id, class_id, ...body }) => ({
        url: `/school/${school_id}/class/${class_id}`,
        method: "PATCH",
        body
      }),
      invalidatesTags: ["Classes"]
    }),
    deleteClasses: builder.mutation<
      void,
      { school_id: string; class_id: string }
    >({
      query: ({ school_id, class_id }) => ({
        url: `/school/${school_id}/class/${class_id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Classes"]
    }),
    updateSchoolProfile: builder.mutation<
      SchoolProfile & BaseResponseInterface,
      SchoolProfile
    >({
      query: ({ school_id, ...body }) => ({
        url: `school/${school_id}`,
        method: "PATCH",
        body
      }),
      invalidatesTags: [{ type: "School" }]
    }),
    getSchoolProfile: builder.query<
      SchoolProfile & BaseResponseInterface,
      { school_id: string }
    >({
      query: ({ school_id }) => ({
        url: `/school/${school_id}`,
        method: "GET"
      }),
      providesTags: ["School"]
    }),
    updateSchoolSettings: builder.mutation<
      SchoolSettings & BaseResponseInterface,
      SchoolSettings
    >({
      query: ({ school_id, ...body }) => ({
        url: `/school/${school_id}/setting/`,
        method: "PATCH",
        body
      }),
      invalidatesTags: [{ type: "SchoolSettings" }]
    }),
    getSchoolSettings: builder.query<
      SchoolSettings & BaseResponseInterface,
      { school_id: string }
    >({
      query: ({ school_id }) => ({
        url: `/school/${school_id}/setting/`,
        method: "GET"
      }),
      providesTags: ["SchoolSettings"]
    }),
    updateSchoolContacts: builder.mutation<
      SchoolContacts & BaseResponseInterface,
      SchoolContacts
    >({
      query: ({ school_id, ...body }) => ({
        url: `/school/${school_id}/contact/`,
        method: "PATCH",
        body
      }),
      invalidatesTags: [{ type: "SchoolContacts" }]
    }),
    getSchoolContacts: builder.query<
      SchoolContacts & BaseResponseInterface,
      { school_id: string }
    >({
      query: ({ school_id }) => ({
        url: `/school/${school_id}/contact/`,
        method: "GET"
      }),
      providesTags: ["SchoolContacts"]
    }),
    createSchoolSocial: builder.mutation<
      SchoolSocials & BaseResponseInterface,
      {
        school_id: string;
        type?: string;
        name?: string;
        link?: string;
        social_id: string;
      }
    >({
      query: ({ school_id, ...body }) => ({
        url: `/school/${school_id}/social`,
        method: "POST",
        body
      }),
      invalidatesTags: [{ type: "School" }]
    }),
    deleteSchoolSocial: builder.mutation<
      SchoolSocials & BaseResponseInterface,
      { school_id: string; social_id: string }
    >({
      query: ({ school_id, social_id }) => ({
        url: `/school/${school_id}/social/${social_id}`,
        method: "DELETE"
      }),
      invalidatesTags: [{ type: "School" }]
    }),
    updateSchoolSocial: builder.mutation<
      SchoolSocials & BaseResponseInterface,
      { school_id: string; social_id: string; link?: string; type?: string }
    >({
      query: ({ school_id, social_id, ...body }) => ({
        url: `/school/${school_id}/social/${social_id}`,
        method: "PATCH",
        body
      }),
      invalidatesTags: [{ type: "School" }]
    }),
// --------------------- modules --------------------------
    getModules: builder.query<IModule, void>({
      query: () => ({
        url: "/module",
        method: "GET"
      }),
      providesTags: ["Modules"]
    }),
    updateModule: builder.mutation<
      IModule & BaseResponseInterface,
      { id: string; }
    >({
      query: ({ id, ...body }) => ({
        url: `/module/${id}`,
        method: "PATCH",
        body
      }),
      invalidatesTags: [{ type: "Modules" }]
    }),
    createModule: builder.mutation<
      IModuleCreate & BaseResponseInterface,
      IModuleCreate
    >({
      query: ({ ...body }) => ({
        url: `/module`,
        method: "POST",
        body
      }),
      invalidatesTags: [{ type: "Modules" }]
    }),
    deleteModule: builder.mutation<
      IModuleDelete & BaseResponseInterface,
      IModuleDelete
    >({
      query: ({ id }) => ({
        url: `/module/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: [{ type: "Modules" }]
    }),

    // --------------------- lessons --------------------------
    getLessons: builder.query<ILesson, void>({
      query: () => ({
        url: "/lesson",
        method: "GET"
      }),
      providesTags: ["Lessons"]
    }),
    updateLesson: builder.mutation<
      ILesson & BaseResponseInterface,
      { id: string; }
    >({
      query: ({ id, ...body }) => ({
        url: `/lesson/${id}`,
        method: "PATCH",
        body
      }),
      invalidatesTags: [{ type: "Lessons" }]
    }),
    createLesson: builder.mutation<
      ILessonCreate & BaseResponseInterface,
      ILessonCreate
    >({
      query: ({ ...body }) => ({
        url: `/lesson`,
        method: "POST",
        body
      }),
      invalidatesTags: [{ type: "Lessons" }]
    }),
    deleteLesson: builder.mutation<
      ILessonDelete & BaseResponseInterface,
      ILessonDelete
    >({
      query: ({ id }) => ({
        url: `/lesson/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: [{ type: "Lessons" }]
    })


  })
});

export const {
  useGetMySchoolsQuery,
  useGetStudentsQuery,
  useGetStudentQuery,
  //---classes----
  useGetClassesQuery,
  useGetSchoolProfileQuery,
  useGetSchoolSettingsQuery,
  useGetSchoolContactsQuery,
  useStudentJoinClassMutation,
  useStudentLeftClassMutation,
  //---social links----

  //----assignment ---------
  useGetAssignmentQuery,
  useGetAssignmentListQuery,

  //---------------- modules --------------
  useGetModulesQuery,

  //---------------- lessons --------------
  useGetLessonsQuery,

  //---------------- mutations --------------
  useUpdateStudentMutation,
  useCreateStudentMutation,
  useDeleteStudentMutation,
  //---classes----
  useUpdateClassesMutation,
  useCreateClassesMutation,
  useDeleteClassesMutation,
  //---school settings----
  useUpdateSchoolProfileMutation,
  useUpdateSchoolSettingsMutation,
  useUpdateSchoolContactsMutation,
  //---social links----
  useCreateSchoolSocialMutation,
  useDeleteSchoolSocialMutation,
  useUpdateSchoolSocialMutation,

  //----assignment ---------
  useUdpateAssignmentMutation,
  useCreateAssignmentMutation,
  useDeleteAssignmentMutation,

  //---------------- modules --------------
  useUpdateModuleMutation,
  useCreateModuleMutation,
  useDeleteModuleMutation,

  //---------------- lessons --------------
  useUpdateLessonMutation,
  useCreateLessonMutation,
  useDeleteLessonMutation
} = managerApi;
