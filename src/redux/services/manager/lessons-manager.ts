/* eslint-disable @typescript-eslint/no-invalid-void-type */
import {
  BaseListResponseInterface,
  BaseResponseInterface,
} from "src/utils/baseResponce.interface";
import { managerApi } from ".";
import {
  ILesson,
  ILessonCreate,
  ILessonDelete,
  ILessonSearchParams,
} from "../interfaces/courseUnits.interface";

const extendedApi = managerApi.injectEndpoints({
  endpoints: (builder) => ({
    getLessons: builder.query<
      BaseListResponseInterface<ILesson & BaseResponseInterface>,
      ILessonSearchParams
    >({
      query: (params) => ({
        url: "/lesson",
        method: "GET",
        params,
      }),
      keepUnusedDataFor: 0,
      providesTags: ["Lessons"],
    }),
    getLesson: builder.query<ILesson & BaseResponseInterface, { id: string }>({
      query: ({ id }) => ({
        url: `/lesson/${id}`,
        method: "GET",
      }),
      keepUnusedDataFor: 0,
      providesTags: ["Lessons"],
    }),
    updateLesson: builder.mutation<
      ILesson & BaseResponseInterface,
      { id: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/lesson/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "Lessons" }],
    }),
    createLesson: builder.mutation<
      ILessonCreate & BaseResponseInterface,
      ILessonCreate
    >({
      query: ({ ...body }) => ({
        url: "/lesson",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Lessons" }],
    }),
    deleteLesson: builder.mutation<
      ILessonDelete & BaseResponseInterface,
      ILessonDelete
    >({
      query: ({ id }) => ({
        url: `/lesson/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Lessons" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetLessonsQuery,
  useGetLessonQuery,
  // -------------mutation-----------
  useCreateLessonMutation,
  useDeleteLessonMutation,
  useUpdateLessonMutation,
} = extendedApi;
