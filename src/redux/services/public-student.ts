import { createApi } from "@reduxjs/toolkit/query/react";

import { BaseListResponseInterface, BaseResponseInterface } from "@utils";
import {
  ICourseContent,
  ICourseElement,
  ICourseSearchParams,
  ILesson,
  ILessonContent,
} from "src/redux/interfaces/content.interface";
import { IGallery } from "src/redux/interfaces/gallary.interface";

import { baseQueryWrapper } from "./helpers/base_query_wrapper";

export const studentPublicApi = createApi({
  reducerPath: "api/public",
  baseQuery: baseQueryWrapper(
    `${process.env.NEXT_PUBLIC_API_URL}/student/public`
  ),
  tagTypes: [
    "CoursePublic",
    "LessonPublic",
    "LessonPublicContent",
    "CoursePublicContent",
    "Projects",
  ],
  endpoints: () => ({}),
});

const extendedApi = studentPublicApi.injectEndpoints({
  endpoints: (builder) => ({
    getPublicCourse: builder.query<
      BaseListResponseInterface<ICourseElement & BaseResponseInterface>,
      ICourseSearchParams
    >({
      query: () => ({
        url: "/course",
        method: "GET",
      }),
      providesTags: ["CoursePublic"],
    }),
    getPublicCourseContent: builder.query<
      ICourseContent & BaseResponseInterface,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/course/${id}/content`,
        method: "GET",
      }),
      providesTags: ["CoursePublicContent"],
    }),
    getPublicLesson: builder.query<
      ILesson & BaseResponseInterface,
      { id: string; lesson_id: string }
    >({
      query: ({ id, lesson_id: lessonId }) => ({
        url: `/course/${id}/lesson/${lessonId}`,
        method: "GET",
      }),
      providesTags: ["LessonPublic"],
    }),
    getPublicLessonContent: builder.query<
      Array<ILessonContent & BaseResponseInterface>,
      { id: string; lesson_id: string }
    >({
      query: ({ id, lesson_id: lessonId }) => ({
        url: `/course/${id}/${lessonId}/content`,
        method: "GET",
      }),
      providesTags: ["LessonPublicContent"],
    }),
    getPublicProject: builder.query<
      IGallery & BaseResponseInterface,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/project/${id}`,
        method: "GET",
      }),
      providesTags: ["Projects"],
    }),
  }),
});

export const {
  useGetPublicCourseContentQuery,
  useGetPublicCourseQuery,
  useGetPublicLessonQuery,
  useGetPublicLessonContentQuery,
  // ------  projects  ---------
  useGetPublicProjectQuery,
} = extendedApi;
