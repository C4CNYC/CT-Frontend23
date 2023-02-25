/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { BaseResponseInterface } from "src/utils/baseResponce.interface";
import { managerApi } from ".";
import { ILessonContent } from "../interfaces/courseUnits.interface";

const extendedApi = managerApi.injectEndpoints({
  endpoints: (builder) => ({
    getLessonContent: builder.query<
      ILessonContent & BaseResponseInterface,
      { lessonId: string }
    >({
      query: ({ lessonId }) => ({
        url: `/lesson/${lessonId}/content`,
        method: "GET",
      }),
      providesTags: ["Lessons"],
    }),
    updateLessonContent: builder.mutation<
      ILessonContent,
      { lessonId: string; body: string }
    >({
      query: ({ lessonId, ...body }) => ({
        url: `/lesson/${lessonId}/content`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "Lessons" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetLessonContentQuery,
  // -------------mutation-----------
  useUpdateLessonContentMutation,
} = extendedApi;
