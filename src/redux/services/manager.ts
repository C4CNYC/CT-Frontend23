import { createApi } from "@reduxjs/toolkit/query/react";
import {
  BaseListResponseInterface,
  BaseResponseInterface,
} from "src/utils/baseResponce.interface";
import { baseQueryWrapper } from "./helpers/base_query_wrapper";
import { baseQueryWithAuth } from "./helpers/query_with_auth";
import { ClassSearchParams, IClass } from "./interfaces/class.interface";
import { SchoolResponce } from "./interfaces/school.interface";
import { IStudent, UserSearchParams } from "./interfaces/user.interface";

export const managerApi = createApi({
  reducerPath: "api/manager",
  baseQuery: baseQueryWithAuth(
    baseQueryWrapper(`${process.env.NEXT_PUBLIC_API_URL}/manager`)
  ),
  tagTypes: ["School", "Students", "Classes"],
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
    // --------------------- classes --------------------------
    getClasses: builder.query<
      BaseListResponseInterface<IClass & BaseResponseInterface>,
      { school_id: string } & ClassSearchParams
    >({
      query: ({ school_id, ...params }) => ({
        url: `/school/${school_id}/class`,
        method: "GET",
        params,
      }),
      providesTags: ["Classes"],
    }),
    createСlasses: builder.mutation<void, { school_id: string; name: string }>({
      query: ({ school_id, ...body }) => ({
        url: `/school/${school_id}/class`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Classes"],
    }),
    updateСlasses: builder.mutation<
      void,
      { school_id: string; class_id: string; name: string }
    >({
      query: ({ school_id, class_id, ...body }) => ({
        url: `/school/${school_id}/class/${class_id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Classes"],
    }),
    deleteСlasses: builder.mutation<
      void,
      { school_id: string; class_id: string }
    >({
      query: ({ school_id, class_id }) => ({
        url: `/school/${school_id}/class/${class_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Classes"],
    }),
  }),
});

export const {
  useGetMySchoolsQuery,
  useGetStudentsQuery,
  useGetStudentQuery,
  //---classes----
  useGetClassesQuery,
  //---------------- mutations --------------
  useUpdateStudentMutation,
  useCreateStudentMutation,
  useDeleteStudentMutation,
  //---classes----
  useUpdateСlassesMutation,
  useCreateСlassesMutation,
  useDeleteСlassesMutation,
} = managerApi;
