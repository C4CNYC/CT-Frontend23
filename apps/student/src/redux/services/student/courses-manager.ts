/* eslint-disable @typescript-eslint/no-invalid-void-type */
import {
  ICourse,
  ICourseContent,
  ICourseSearchParams,
} from "src/redux/interfaces/content.interface";
import {
  BaseListResponseInterface,
  BaseResponseInterface,
} from "@ct-nx/utils";
import { studentApi } from ".";

const extendedApi = studentApi.injectEndpoints({
  endpoints: (builder) => ({
    getCourse: builder.query<
      BaseListResponseInterface<ICourse & BaseResponseInterface>,
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
    getCours: builder.query<ICourse & BaseResponseInterface, { id: string }>({
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
  }),
  overrideExisting: false,
});

export const {
  useGetCourseQuery,
  useGetCoursQuery,
  useGetCoursContentQuery,
  // -------------mutation-----------
} = extendedApi;
