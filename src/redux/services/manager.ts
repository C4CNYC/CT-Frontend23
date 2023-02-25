/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi } from "@reduxjs/toolkit/query/react";
import {
  BaseListResponseInterface,
  BaseResponseInterface,
} from "src/utils/baseResponce.interface";
import { baseQueryWrapper } from "./helpers/base_query_wrapper";
import { baseQueryWithAuth } from "./helpers/query_with_auth";
import {
  IAssignment,
  IAssignmentCreate,
  IAssignmentUpdate,
} from "./interfaces/assignment.interface";
import { ClassSearchParams, IClass } from "./interfaces/class.interface";
import {
  ICourse,
  ICourseCreate,
  ICourseDelete,
  ILesson,
  ILessonCreate,
  ILessonDelete,
  IModule,
  IModuleCreate,
  IModuleDelete,
} from "./interfaces/courseUnits.interface";
import {
  SchoolContacts,
  SchoolProfile,
  SchoolResponce,
  SchoolSettings,
  SchoolSocials,
} from "./interfaces/school.interface";
import { IStudent, StudentSearchParams } from "./interfaces/user.interface";

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
    "Lessons",
    "Courses",
  ],
  endpoints: (builder) => ({
    getAssignment: builder.query<
      IAssignment & BaseResponseInterface,
      { schoolId: string; assignmentId: string }
    >({
      query: ({ schoolId, assignmentId }) => ({
        url: `/school/${schoolId}/assignment/${assignmentId}`,
        method: "GET",
      }),
      providesTags: ["Assignment"],
    }),
    getAssignmentList: builder.query<
      Array<IAssignment & BaseResponseInterface>,
      { schoolId: string }
    >({
      query: ({ schoolId }) => ({
        url: `/school/${schoolId}/assignment`,
        method: "GET",
      }),
      providesTags: ["Assignments"],
    }),
    createAssignment: builder.mutation<
      IAssignment & BaseResponseInterface,
      {
        schoolId: string;
      } & IAssignmentCreate
    >({
      query: ({ schoolId, ...body }) => ({
        url: `/school/${schoolId}/assignment/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Assignments"],
    }),
    udpateAssignment: builder.mutation<
      void,
      {
        assignmentId: string;
        schoolId: string;
      } & IAssignmentUpdate
    >({
      query: ({ schoolId, assignmentId, ...body }) => ({
        url: `/school/${schoolId}/assignment/${assignmentId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Assignments", "Assignment"],
    }),
    deleteAssignment: builder.mutation<
      void,
      { schoolId: string; assignmentId: string }
    >({
      query: ({ schoolId, assignmentId }) => ({
        url: `/school/${schoolId}/assignment/${assignmentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Assignments"],
    }),
    getMySchools: builder.query<
      BaseListResponseInterface<SchoolResponce>,
      void
    >({
      query: () => ({
        url: "/school",
        method: "GET",
      }),
      providesTags: ["School"],
    }),
    getStudent: builder.query<
      IStudent & BaseResponseInterface,
      { schoolId: string; studentId: string }
    >({
      query: ({ schoolId, studentId }) => ({
        url: `/school/${schoolId}/student/${studentId}`,
        method: "GET",
      }),
      providesTags: ["Students"],
    }),
    getStudents: builder.query<
      BaseListResponseInterface<IStudent & BaseResponseInterface>,
      { schoolId: string } & StudentSearchParams
    >({
      query: ({ schoolId, ...params }) => ({
        url: `/school/${schoolId}/student`,
        method: "GET",
        params,
      }),
      providesTags: ["Students"],
    }),
    createStudent: builder.mutation<void, { schoolId: string } & IStudent>({
      query: ({ schoolId, ...body }) => ({
        url: `/school/${schoolId}/student`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Students", "School"],
    }),
    updateStudent: builder.mutation<
      void,
      { schoolId: string; studentId: string } & Omit<IStudent, "email">
    >({
      query: ({ schoolId, studentId, ...body }) => ({
        url: `/school/${schoolId}/student/${studentId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Students"],
    }),
    studentJoinClass: builder.mutation<
      void,
      { schoolId: string; class_id: string; studentId: string }
    >({
      query: ({ schoolId, class_id, ...body }) => ({
        url: `/school/${schoolId}/class/${class_id}/student`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Students"],
    }),
    studentLeftClass: builder.mutation<
      void,
      { schoolId: string; class_id: string; studentId: string }
    >({
      query: ({ schoolId, class_id, ...body }) => ({
        url: `/school/${schoolId}/class/${class_id}/student`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Students"],
    }),
    deleteStudent: builder.mutation<
      void,
      { schoolId: string; studentId: string }
    >({
      query: ({ schoolId, studentId }) => ({
        url: `/school/${schoolId}/student/${studentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Students"],
    }),
    // --------------------- classes --------------------------
    getClasses: builder.query<
      BaseListResponseInterface<IClass & BaseResponseInterface>,
      { schoolId: string } & ClassSearchParams
    >({
      query: ({ schoolId, ...params }) => ({
        url: `/school/${schoolId}/class`,
        method: "GET",
        params,
      }),
      providesTags: ["Classes"],
    }),
    createClasses: builder.mutation<void, { schoolId: string; name: string }>({
      query: ({ schoolId, ...body }) => ({
        url: `/school/${schoolId}/class`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Classes"],
    }),
    updateClasses: builder.mutation<
      void,
      { schoolId: string; class_id: string; name: string }
    >({
      query: ({ schoolId, class_id, ...body }) => ({
        url: `/school/${schoolId}/class/${class_id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Classes"],
    }),
    deleteClasses: builder.mutation<
      void,
      { schoolId: string; class_id: string }
    >({
      query: ({ schoolId, class_id }) => ({
        url: `/school/${schoolId}/class/${class_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Classes"],
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
        social_id: string;
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
      { schoolId: string; social_id: string }
    >({
      query: ({ schoolId, social_id }) => ({
        url: `/school/${schoolId}/social/${social_id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "School" }],
    }),
    updateSchoolSocial: builder.mutation<
      SchoolSocials & BaseResponseInterface,
      { schoolId: string; social_id: string; link?: string; type?: string }
    >({
      query: ({ schoolId, social_id, ...body }) => ({
        url: `/school/${schoolId}/social/${social_id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "School" }],
    }),
    // --------------------- courses --------------------------
    getCourse: builder.query<IModule, void>({
      query: () => ({
        url: "/course",
        method: "GET",
      }),
      providesTags: ["Courses"],
    }),
    updateCourse: builder.mutation<
      ICourse & BaseResponseInterface,
      { id: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/course/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "Courses" }],
    }),
    createCourse: builder.mutation<
      ICourseCreate & BaseResponseInterface,
      ICourseCreate
    >({
      query: ({ ...body }) => ({
        url: "/course",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Courses" }],
    }),
    deleteCourse: builder.mutation<
      ICourseDelete & BaseResponseInterface,
      ICourseDelete
    >({
      query: ({ id }) => ({
        url: `/course/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Courses" }],
    }),

    // --------------------- modules --------------------------
    getModules: builder.query<IModule, void>({
      query: () => ({
        url: "/module",
        method: "GET",
      }),
      providesTags: ["Modules"],
    }),
    updateModule: builder.mutation<
      IModule & BaseResponseInterface,
      { id: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/module/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "Modules" }],
    }),
    createModule: builder.mutation<
      IModuleCreate & BaseResponseInterface,
      IModuleCreate
    >({
      query: ({ ...body }) => ({
        url: "/module",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Modules" }],
    }),
    deleteModule: builder.mutation<
      IModuleDelete & BaseResponseInterface,
      IModuleDelete
    >({
      query: ({ id }) => ({
        url: `/module/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Modules" }],
    }),

    // --------------------- lessons --------------------------
    getLessons: builder.query<BaseListResponseInterface<ILesson>, void>({
      query: () => ({
        url: "/lesson",
        method: "GET",
      }),
      providesTags: ["Lessons"],
    }),
    updateLesson: builder.mutation<
      ILesson & BaseResponseInterface,
      { id: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/lesson/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "Lessons" }],
    }),
    createLesson: builder.mutation<
      ILessonCreate & BaseResponseInterface,
      ILessonCreate
    >({
      query: ({ ...body }) => ({
        url: "/lesson",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Lessons" }],
    }),
    deleteLesson: builder.mutation<
      ILessonDelete & BaseResponseInterface,
      ILessonDelete
    >({
      query: ({ id }) => ({
        url: `/lesson/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Lessons" }],
    }),
  }),
});

export const {
  useGetMySchoolsQuery,
  useGetStudentsQuery,
  useGetStudentQuery,
  // ---classes----
  useGetClassesQuery,
  useGetSchoolProfileQuery,
  useGetSchoolSettingsQuery,
  useGetSchoolContactsQuery,
  useStudentJoinClassMutation,
  useStudentLeftClassMutation,
  // ----assignment ---------
  useGetAssignmentQuery,
  useGetAssignmentListQuery,
  // ---------------- modules --------------
  useGetModulesQuery,
  // ---------------- lessons --------------
  useGetLessonsQuery,
  // ---------------- courses --------------
  useGetCourseQuery,

  // ---------------- mutations --------------
  useUpdateStudentMutation,
  useCreateStudentMutation,
  useDeleteStudentMutation,
  // ---classes----
  useUpdateClassesMutation,
  useCreateClassesMutation,
  useDeleteClassesMutation,
  // ---school settings----
  useUpdateSchoolProfileMutation,
  useUpdateSchoolSettingsMutation,
  useUpdateSchoolContactsMutation,
  // ---social links----
  useCreateSchoolSocialMutation,
  useDeleteSchoolSocialMutation,
  useUpdateSchoolSocialMutation,

  // ----assignment ---------
  useUdpateAssignmentMutation,
  useCreateAssignmentMutation,
  useDeleteAssignmentMutation,

  // ---------------- modules --------------
  useUpdateModuleMutation,
  useCreateModuleMutation,
  useDeleteModuleMutation,

  // ---------------- lessons --------------
  useUpdateLessonMutation,
  useCreateLessonMutation,
  useDeleteLessonMutation,

  // ---------------- courses --------------
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} = managerApi;
