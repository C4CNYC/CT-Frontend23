/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { BaseResponseInterface } from "@utils";
import { IProgress } from "src/redux/interfaces/progress.interface";

import { managerApi } from ".";

const extendedApi = managerApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyProgressByCourse: builder.query<
      IProgress & BaseResponseInterface,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/student/course/${id}/progress`,
        method: "GET",
      }),
      providesTags: ["Progress"],
    }),
    completeLesson: builder.mutation<
      string,
      { id: string; lesson_content_id: string; module_id: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/student/course/${id}/progress/complete-chalange`,
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
