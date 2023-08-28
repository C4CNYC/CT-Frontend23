/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { BaseListResponseInterface, BaseResponseInterface } from "@utils";
import {
  ICourseContent,
  ICourseElement,
  ICourseSearchParams,
  ILesson,
  IModuleContent,
} from "src/redux/interfaces/content.interface";

import { managerApi } from ".";

const extendedApi = managerApi.injectEndpoints({
  endpoints: (builder) => ({
    getCourse: builder.query<
      BaseListResponseInterface<ICourseElement & BaseResponseInterface>,
      ICourseSearchParams
    >({
      query: (params) => ({
        url: "/student/course",
        method: "GET",
        params,
      }),
      keepUnusedDataFor: 0,
      providesTags: ["Courses"],
    }),
    getCours: builder.query<
      ICourseElement & BaseResponseInterface,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/student/course/${id}`,
        method: "GET",
      }),
      keepUnusedDataFor: 0,
      providesTags: ["Courses"],
    }),
    getCoursContent: builder.query<
      ICourseContent & BaseResponseInterface,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/student/course/${id}/content`,
        method: "GET",
      }),
      keepUnusedDataFor: 0,
      providesTags: ["Courses"],
    }),
    getStudentCourseModules: builder.query<
      Array<IModuleContent & BaseResponseInterface>,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/student/course/${id}/modules`,
        method: "GET",
      }),
    }),
    getStudentModulesLessons: builder.query<
      Array<ILesson & BaseResponseInterface>,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/student/modules/${id}/lessons`,
        method: "GET",
      }),
    }),
    courseAddLike: builder.mutation<
      ICourseContent & BaseResponseInterface,
      { id: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/student/course/${id}/like/add`,
        method: "PATCH",
        body,
      }),
    }),
    courseRemoveLike: builder.mutation<
      ICourseContent & BaseResponseInterface,
      { id: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/student/course/${id}/like/remove`,
        method: "PATCH",
        body,
      }),
    }),
    courseAddRating: builder.mutation<
      ICourseContent & BaseResponseInterface,
      { id: string; rating: number }
    >({
      query: ({ id, ...body }) => ({
        url: `/student/course/${id}/rating`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "Courses" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCourseQuery,
  useGetCoursQuery,
  useGetCoursContentQuery,
  useGetStudentCourseModulesQuery,
  useGetStudentModulesLessonsQuery,
  // -------------mutation-----------
  useCourseAddLikeMutation,
  useCourseRemoveLikeMutation,
  useCourseAddRatingMutation,
} = extendedApi;
