/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { BaseListResponseInterface, BaseResponseInterface } from "@utils";

import { managerApi } from ".";
import {
  IAddModuleToCourse,
  ICourse,
  ICourseCreate,
  ICourseDelete,
  ICourseSearchParams,
  IRemoveModuleFromCourse,
} from "../interfaces/courseUnits.interface";

const extendedApi = managerApi.injectEndpoints({
  endpoints: (builder) => ({
    managerGetCourse: builder.query<
      BaseListResponseInterface<ICourse & BaseResponseInterface>,
      ICourseSearchParams
    >({
      query: (params) => ({
        url: "/manager/course",
        method: "GET",
        params,
      }),
      keepUnusedDataFor: 0,
      providesTags: ["CoursesManager"],
    }),
    updateCourse: builder.mutation<
      ICourse & BaseResponseInterface,
      { id: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/manager/course/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "CoursesManager" }],
    }),
    updateCourseCover: builder.mutation<
      ICourse & BaseResponseInterface,
      { id: string; file: FormData }
    >({
      query: ({ id, file }) => ({
        url: `/manager/course/${id}/cover`,
        method: "PATCH",
        body: file,
      }),
      invalidatesTags: [{ type: "CoursesManager" }],
    }),
    createCourse: builder.mutation<
      ICourseCreate & BaseResponseInterface,
      ICourseCreate
    >({
      query: ({ ...body }) => ({
        url: "/manager/course",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "CoursesManager" }],
    }),
    deleteCourse: builder.mutation<
      ICourseDelete & BaseResponseInterface,
      ICourseDelete
    >({
      query: ({ id }) => ({
        url: `/manager/course/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "CoursesManager" }],
    }),
    addModuleToCourse: builder.mutation<void, IAddModuleToCourse>({
      query: ({ id, ...body }) => ({
        url: `/manager/course/${id}/unit`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "Modules" }],
    }),
    removeModuleFromCourse: builder.mutation<void, IRemoveModuleFromCourse>({
      query: ({ id, ...body }) => ({
        url: `/manager/course/${id}/unit`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: [{ type: "Modules" }],
    }),
    getCouseSkills: builder.query<
      BaseListResponseInterface<{ name: string } & BaseResponseInterface>,
      void
    >({
      query: () => ({
        url: "/manager/course/skills",
        method: "GET",
      }),
      keepUnusedDataFor: 0,
      providesTags: ["Skills"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useManagerGetCourseQuery,
  // -------------mutation-----------
  useAddModuleToCourseMutation,
  useRemoveModuleFromCourseMutation,
  useCreateCourseMutation,
  useDeleteCourseMutation,
  useUpdateCourseMutation,
  useUpdateCourseCoverMutation,
} = extendedApi;
