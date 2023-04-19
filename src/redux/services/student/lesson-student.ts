/* eslint-disable @typescript-eslint/no-invalid-void-type */

import { BaseResponseInterface } from "src/utils/baseResponce.interface";
import { studentApi } from ".";
import { ILesson, ILessonContent } from "../interfaces/courseUnits.interface";

const extendedApi = studentApi.injectEndpoints({
  endpoints: (builder) => ({
    getLessonContent: builder.query<
      Array<ILessonContent & BaseResponseInterface>,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/lesson/${id}/content`,
        method: "GET",
      }),
      keepUnusedDataFor: 0,
    }),
    getLesson: builder.query<ILesson & BaseResponseInterface, { id: string }>({
      query: ({ id }) => ({
        url: `/lesson/${id}`,
        method: "GET",
      }),
      keepUnusedDataFor: 0,
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetLessonContentQuery,
  useGetLessonQuery,
  // -------------mutation-----------
} = extendedApi;
