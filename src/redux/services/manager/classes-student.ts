/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { BaseListResponseInterface, BaseResponseInterface } from "@utils";
import {
  ClassSearchParams,
  IClass,
  IMentor,
} from "src/redux/interfaces/class.interface";

import { managerApi } from ".";
import { IStudent, IStudentSearchParams } from "../interfaces/user.interface";

const extendedApi = managerApi.injectEndpoints({
  endpoints: (builder) => ({
    createClass: builder.mutation<void, IClass>({
      query: ({ ...body }) => ({
        url: "/student/class",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Classes"],
    }),
    joinClass: builder.mutation<
      { status: "joined"; tribe: IClass & BaseResponseInterface },
      { share_token: string }
    >({
      query: ({ ...body }) => ({
        url: "/student/class/join",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Classes"],
    }),
    getClasses: builder.query<
      BaseListResponseInterface<IClass & BaseResponseInterface>,
      ClassSearchParams
    >({
      query: ({ ...params }) => ({
        url: "/student/class",
        method: "GET",
        params,
      }),
      keepUnusedDataFor: 0,
      providesTags: ["Classes"],
    }),
    getClass: builder.query<IClass & BaseResponseInterface, { id: string }>({
      query: ({ id }) => ({
        url: `/student/class/${id}`,
        method: "GET",
      }),
      providesTags: ["Classes"],
    }),
    getClassStudents: builder.query<
      BaseListResponseInterface<IStudent & BaseResponseInterface>,
      { id: string } & IStudentSearchParams
    >({
      query: ({ id, ...params }) => ({
        url: `/student/class/${id}/students`,
        method: "GET",
        params,
      }),
      providesTags: ["Classes"],
    }),
    getClassMentor: builder.query<IMentor[], { id: string }>({
      query: ({ id }) => ({
        url: `/student/class/${id}/mentor`,
        method: "GET",
      }),
      transformResponse: (response: IMentor[]) => {
        const manager = response.filter((el) => el.role === "manager");
        return manager ?? response;
      },
      providesTags: ["Classes"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetClassesQuery,
  useGetClassQuery,
  useGetClassMentorQuery,
  useGetClassStudentsQuery,
  // -------------mutation-----------
  useJoinClassMutation,
  useCreateClassMutation,
} = extendedApi;
