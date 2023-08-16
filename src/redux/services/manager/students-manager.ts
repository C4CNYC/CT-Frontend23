/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { BaseListResponseInterface, BaseResponseInterface } from "@utils";

import { managerApi } from ".";
import {
  IStudent,
  IStudentSearchParams,
  StudentSearchParams,
} from "../interfaces/user.interface";

const extendedApi = managerApi.injectEndpoints({
  endpoints: (builder) => ({
    getStudent: builder.query<
      IStudent & BaseResponseInterface,
      { schoolId: string; studentId: string }
    >({
      query: ({ schoolId, studentId }) => ({
        url: `/manager/school/${schoolId}/student/${studentId}`,
        method: "GET",
      }),
      providesTags: ["Students"],
    }),
    getStudents: builder.query<
      BaseListResponseInterface<IStudent & BaseResponseInterface>,
      { schoolId: string } & StudentSearchParams
    >({
      query: ({ schoolId, ...params }) => ({
        url: `/manager/school/${schoolId}/student`,
        method: "GET",
        params,
      }),
      providesTags: ["Students"],
    }),
    getClassPending: builder.query<
      BaseListResponseInterface<IStudent & BaseResponseInterface>,
      { classId: string } & IStudentSearchParams
    >({
      query: ({ classId, ...params }) => ({
        url: `/manager/school/{schoolId}/class/${classId}/student/pending`,
        method: "GET",
        params,
      }),
      providesTags: ["Pendings"],
    }),
    updateClassPending: builder.mutation<
      void,
      { classId: string; student_id: string }
    >({
      query: ({ classId, ...body }) => ({
        url: `/manager/school/{schoolId}/class/${classId}/student/pending`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Pendings", "ClassesStudentList"],
    }),
    getGoogleClasses: builder.query<
      any[],
      { access_token: string; schoolId: string; classId: string }
    >({
      query: ({ schoolId, classId, ...body }) => ({
        url: `/manager/school/${schoolId}/class/${classId}/student/google-classes`,
        method: "POST",
        body,
      }),
    }),
    migrateGoogleClassesStudents: builder.mutation<
      any[],
      {
        access_token: string;
        schoolId: string;
        classId: string;
        google_class_id: string;
      }
    >({
      query: ({ schoolId, classId, ...body }) => ({
        url: `/manager/school/${schoolId}/class/${classId}/student/migrate/google-classes`,
        method: "POST",
        body,
      }),
    }),
    createStudent: builder.mutation<
      IStudent & BaseResponseInterface,
      { schoolId: string }
    >({
      query: ({ schoolId, ...body }) => ({
        url: `/manager/school/${schoolId}/student`,
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
        url: `/manager/school/${schoolId}/student/${studentId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Students"],
    }),
    updateStudentAvatar: builder.mutation<
      void,
      { schoolId: string; studentId: string; file: FormData }
    >({
      query: ({ schoolId, studentId, file }) => ({
        url: `/manager/school/${schoolId}/student/${studentId}/avatar`,
        method: "PATCH",
        body: file,
      }),
      invalidatesTags: ["Students", "School"],
    }),
    studentJoinClass: builder.mutation<
      void,
      { classId: string; student_id: string }
    >({
      query: ({ classId, ...body }) => ({
        url: `/manager/school/{schoolId}/class/${classId}/student`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Students"],
    }),
    studentLeftClass: builder.mutation<
      void,
      { classId: string; student_id: string }
    >({
      query: ({ classId, ...body }) => ({
        url: `/manager/school/{schoolId}/class/${classId}/student`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Students", "ClassesStudent"],
    }),
    deleteStudent: builder.mutation<
      void,
      { schoolId: string; studentId: string }
    >({
      query: ({ schoolId, studentId }) => ({
        url: `/manager/school/${schoolId}/student/${studentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Students"],
    }),
    inviteStudent: builder.mutation<
      IStudent & BaseResponseInterface,
      { schoolId: string; email: string; class_id?: string }
    >({
      query: ({ schoolId, ...body }) => ({
        url: `/manager/school/${schoolId}/student/invite`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["ClassesStudentList"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetStudentQuery,
  useGetStudentsQuery,
  useGetGoogleClassesQuery,
  useGetClassPendingQuery,
  // -------------mutation-----------
  useUpdateClassPendingMutation,
  useMigrateGoogleClassesStudentsMutation,
  useCreateStudentMutation,
  useDeleteStudentMutation,
  useStudentJoinClassMutation,
  useStudentLeftClassMutation,
  useUpdateStudentMutation,
  useUpdateStudentAvatarMutation,
  useInviteStudentMutation,
} = extendedApi;
