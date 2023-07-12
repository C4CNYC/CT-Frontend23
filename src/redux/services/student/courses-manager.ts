/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { BaseListResponseInterface, BaseResponseInterface } from "@utils";
import {
  ICourseContent,
  ICourseElement,
  ICourseSearchParams,
} from "src/redux/interfaces/content.interface";

import { studentApi } from ".";

const extendedApi = studentApi.injectEndpoints({
  endpoints: (builder) => ({
    getCourse: builder.query<
      BaseListResponseInterface<ICourseElement & BaseResponseInterface>,
      ICourseSearchParams
    >({
      query: (params) => ({
        url: "/course",
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
        url: `/course/${id}`,
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
        url: `/course/${id}/content`,
        method: "GET",
      }),
      keepUnusedDataFor: 0,
      providesTags: ["Courses"],
    }),
    courseAddLike: builder.mutation<
      ICourseContent & BaseResponseInterface,
      { id: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/course/${id}/like/add`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "Courses" }],
    }),
    courseRemoveLike: builder.mutation<
      ICourseContent & BaseResponseInterface,
      { id: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/course/${id}/like/remove`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "Courses" }],
    }),
    courseAddRating: builder.mutation<
      ICourseContent & BaseResponseInterface,
      { id: string; rating: number }
    >({
      query: ({ id, ...body }) => ({
        url: `/course/${id}/rating`,
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
  // -------------mutation-----------
  useCourseAddLikeMutation,
  useCourseRemoveLikeMutation,
  useCourseAddRatingMutation,
} = extendedApi;
