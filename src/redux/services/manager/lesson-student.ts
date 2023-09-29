/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { BaseListResponseInterface, BaseResponseInterface } from "@utils";
import {
  ILesson,
  ILessonContent,
  ILessonSearchParams, LastVisitedBody, LastVisitedData,
} from "src/redux/interfaces/content.interface"

import { managerApi } from ".";

const extendedApi = managerApi.injectEndpoints({
  endpoints: (builder) => ({
    getLessonContentStudent: builder.query<
      Array<ILessonContent & BaseResponseInterface>,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/student/lesson/${id}/content`,
        method: "GET",
      }),
      keepUnusedDataFor: 0,
      transformResponse: (res: Array<ILessonContent & BaseResponseInterface>) =>
        res.sort((a, b) => a.meta.order - b.meta.order),
    }),
    getLessonStudent: builder.query<
      ILesson & BaseResponseInterface,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/student/lesson/${id}`,
        method: "GET",
      }),
      keepUnusedDataFor: 0,
    }),
    getLessonsListStudent: builder.query<
      BaseListResponseInterface<ILesson & BaseResponseInterface>,
      ILessonSearchParams
    >({
      query: (params) => ({
        url: "/student/content/lesson",
        method: "GET",
        params,
      }),
      keepUnusedDataFor: 0,
      providesTags: ["Lessons"],
    }),
    getStudentLastVisitedData: builder.query<
      LastVisitedData, { courseId: string }
      >({
      query: ({ courseId }) => ({
        url: `/student/lesson/${courseId}/last-visited`,
        method: "GET",
      }),
      providesTags: ["LastVisitedData"]
    }),
    updateStudentLastVisitedData: builder.mutation<void, LastVisitedBody>({
      query: ({ ...body }) => ({
        url: "/student/lesson/last-visited",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["LastVisitedData"]
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetLessonContentStudentQuery,
  useGetLessonStudentQuery,
  useGetLessonsListStudentQuery,
  useGetStudentLastVisitedDataQuery,
  // -------------mutation-----------
  useUpdateStudentLastVisitedDataMutation,
} = extendedApi;
