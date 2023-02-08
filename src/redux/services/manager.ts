import { createApi } from "@reduxjs/toolkit/query/react";
import {
  BaseListResponseInterface,
  BaseResponseInterface,
} from "src/utils/baseResponce.interface";
import { baseQueryWrapper } from "./helpers/base_query_wrapper";
import { baseQueryWithAuth } from "./helpers/query_with_auth";
import { SchoolResponce } from "./interfaces/school.interface";
import { IStudent, UserSearchParams } from "./interfaces/user.interface";

export const managerApi = createApi({
  reducerPath: "api/manager",
  baseQuery: baseQueryWithAuth(
    baseQueryWrapper(`${process.env.NEXT_PUBLIC_API_URL}/manager`)
  ),
  tagTypes: ["School", "Students"],
  endpoints: (builder) => ({
    getMySchools: builder.query<
      BaseListResponseInterface<SchoolResponce>,
      void
    >({
      query: () => ({
        url: `/school`,
        method: "GET",
      }),
      providesTags: ["School"],
    }),
    getStudent: builder.query<
      IStudent & BaseResponseInterface,
      { school_id: string; student_id: string }
    >({
      query: ({ school_id, student_id }) => ({
        url: `/school/${school_id}/student/${student_id}`,
        method: "GET",
      }),
      providesTags: ["Students"],
    }),
    getStudents: builder.query<
      BaseListResponseInterface<IStudent & BaseResponseInterface>,
      { school_id: string } & UserSearchParams
    >({
      query: ({ school_id, ...params }) => ({
        url: `/school/${school_id}/student`,
        method: "GET",
        params,
      }),
      providesTags: ["Students"],
    }),
    createStudent: builder.mutation<void, { school_id: string } & IStudent>({
      query: ({ school_id, ...body }) => ({
        url: `/school/${school_id}/student`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Students"],
    }),
    updateStudent: builder.mutation<
      void,
      { school_id: string; student_id: string } & Omit<IStudent, "email">
    >({
      query: ({ school_id, student_id, ...body }) => ({
        url: `/school/${school_id}/student/${student_id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Students"],
    }),
    deleteStudent: builder.mutation<
      void,
      { school_id: string; student_id: string }
    >({
      query: ({ school_id, student_id }) => ({
        url: `/school/${school_id}/student/${student_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Students"],
    }),
  }),
});

export const {
  useGetMySchoolsQuery,
  useGetStudentsQuery,
  useGetStudentQuery,
  //---------------- mutations --------------
  useUpdateStudentMutation,
  useCreateStudentMutation,
  useDeleteStudentMutation,
} = managerApi;
