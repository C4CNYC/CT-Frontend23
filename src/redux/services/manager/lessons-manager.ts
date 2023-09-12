/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { BaseListResponseInterface, BaseResponseInterface } from "@utils";

import { managerApi } from ".";
import {
  ILesson,
  ILessonCreate,
  ILessonDelete,
  ILessonSearchParams,
  ILessonUpdate,
} from "../interfaces/courseUnits.interface";
import { IIntegration } from "../interfaces/integration.interface";

const extendedApi = managerApi.injectEndpoints({
  endpoints: (builder) => ({
    getLessons: builder.query<
      BaseListResponseInterface<ILesson & BaseResponseInterface>,
      ILessonSearchParams
    >({
      query: (params) => ({
        url: "/manager/lesson",
        method: "GET",
        params,
      }),
      keepUnusedDataFor: 0,
      providesTags: ["Lessons"],
    }),
    getLesson: builder.query<ILesson & BaseResponseInterface, { id: string }>({
      query: ({ id }) => ({
        url: `/manager/lesson/${id}`,
        method: "GET",
      }),
      keepUnusedDataFor: 0,
      providesTags: ["Lessons"],
    }),
    updateLesson: builder.mutation<
      ILesson & BaseResponseInterface,
      ILessonUpdate
    >({
      query: ({ id, ...body }) => ({
        url: `/manager/lesson/${id}`,
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
        url: "/manager/lesson",
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
        url: `/manager/lesson/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Lessons" }],
    }),
    getLessonIntegrations: builder.query<
      Array<IIntegration & BaseResponseInterface>,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/manager/lesson/${id}/integration`,
        method: "GET",
      }),
      providesTags: ["ContentIntegration"],
      keepUnusedDataFor: 0,
    }),
    addIntegration: builder.mutation<
      void,
      { lessonId: string; integration_id: string }
    >({
      query: ({ lessonId, ...body }) => ({
        url: `/manager/lesson/${lessonId}/integration`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["ContentIntegration"],
    }),
    removeIntegration: builder.mutation<
      void,
      { lessonId: string; integration_id: string }
    >({
      query: ({ lessonId, ...body }) => ({
        url: `/manager/lesson/${lessonId}/integration`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["ContentIntegration"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetLessonsQuery,
  useGetLessonQuery,
  useGetLessonIntegrationsQuery,
  // -------------mutation-----------
  useCreateLessonMutation,
  useUpdateLessonMutation,
  useDeleteLessonMutation,
  useAddIntegrationMutation,
  useRemoveIntegrationMutation,
} = extendedApi;
