/* eslint-disable @typescript-eslint/no-invalid-void-type */
import {
  BaseListResponseInterface,
  BaseResponseInterface,
} from "src/utils/baseResponce.interface";
import { managerApi } from ".";
import { IStudent, StudentSearchParams } from "../interfaces/user.interface";

const extendedApi = managerApi.injectEndpoints({
  endpoints: (builder) => ({
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
      { schoolId: string; classId: string; studentId: string }
    >({
      query: ({ schoolId, classId, ...body }) => ({
        url: `/school/${schoolId}/class/${classId}/student`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Students"],
    }),
    studentLeftClass: builder.mutation<
      void,
      { schoolId: string; classId: string; studentId: string }
    >({
      query: ({ schoolId, classId, ...body }) => ({
        url: `/school/${schoolId}/class/${classId}/student`,
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
  }),
  overrideExisting: false,
});

export const {
  useGetStudentQuery,
  useGetStudentsQuery,
  // -------------mutation-----------
  useCreateStudentMutation,
  useDeleteStudentMutation,
  useStudentJoinClassMutation,
  useStudentLeftClassMutation,
  useUpdateStudentMutation,
} = extendedApi;
