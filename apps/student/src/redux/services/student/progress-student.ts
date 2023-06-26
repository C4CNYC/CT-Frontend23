/* eslint-disable @typescript-eslint/no-invalid-void-type */

import { IProgress } from "src/redux/interfaces/progress.interface";
import { BaseResponseInterface } from "@ct-nx/utils";
import { studentApi } from ".";

const extendedApi = studentApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyProgressByCourse: builder.query<
      IProgress & BaseResponseInterface,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/course/${id}/progress`,
        method: "GET",
      }),
      providesTags: ["Progress"],
    }),
    completeLesson: builder.mutation<
      string,
      { id: string; lesson_content_id: string; module_id: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/course/${id}/progress/complete-chalange`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Progress"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetMyProgressByCourseQuery,
  // -------------mutation-----------
  useCompleteLessonMutation,
} = extendedApi;
