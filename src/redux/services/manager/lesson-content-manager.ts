/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { BaseResponseInterface } from "src/utils/baseResponce.interface";
import { managerApi } from ".";
import {
  ILessonContent,
  ILessonContentUpdate,
} from "../interfaces/courseUnits.interface";
import { IIntegration } from "../interfaces/integration.interface";

const extendedApi = managerApi.injectEndpoints({
  endpoints: (builder) => ({
    getLessonContent: builder.query<
      Array<ILessonContent & BaseResponseInterface>,
      { lessonId: string }
    >({
      query: ({ lessonId }) => ({
        url: `/lesson/${lessonId}/content`,
        method: "GET",
      }),
      providesTags: ["LessonsContent"],
    }),
    getLessonContentById: builder.query<
      ILessonContent & BaseResponseInterface,
      { lessonId: string; id: string }
    >({
      query: ({ lessonId, id }) => ({
        url: `/lesson/${lessonId}/content/${id}`,
        method: "GET",
      }),
      providesTags: ["LessonContentItem"],
      keepUnusedDataFor: 0,
    }),
    getContentIntegrations: builder.query<
      Array<IIntegration & BaseResponseInterface>,
      { lessonId: string; id: string }
    >({
      query: ({ lessonId, id }) => ({
        url: `/lesson/${lessonId}/content/${id}/integration`,
        method: "GET",
      }),
      providesTags: ["ContentIntegration"],
      keepUnusedDataFor: 0,
    }),
    createLessonContent: builder.mutation<
      ILessonContent,
      { lessonId: string } & Omit<
        ILessonContentUpdate,
        "body" | "type" | "cover"
      >
    >({
      query: ({ lessonId, ...body }) => ({
        url: `/lesson/${lessonId}/content`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "LessonsContent" }],
    }),
    updateLessonContent: builder.mutation<
      ILessonContent,
      { lessonId: string; id: string } & ILessonContentUpdate
    >({
      query: ({ lessonId, id, ...body }) => ({
        url: `/lesson/${lessonId}/content/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "LessonsContent" }],
    }),
    addIntegration: builder.mutation<
      ILessonContent,
      { lessonId: string; id: string; integration_id: string }
    >({
      query: ({ lessonId, id, ...body }) => ({
        url: `/lesson/${lessonId}/content/${id}/integration`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["ContentIntegration"],
    }),
    removeIntegration: builder.mutation<
      ILessonContent,
      { lessonId: string; id: string; integration_id: string }
    >({
      query: ({ lessonId, id, ...body }) => ({
        url: `/lesson/${lessonId}/content/${id}/integration`,
        body,
        method: "DELETE",
      }),
      invalidatesTags: ["ContentIntegration"],
    }),
    removeLessonContent: builder.mutation<
      ILessonContent,
      { lessonId: string; id: string }
    >({
      query: ({ lessonId, id }) => ({
        url: `/lesson/${lessonId}/content/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "LessonsContent" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetContentIntegrationsQuery,
  useGetLessonContentQuery,
  useGetLessonContentByIdQuery,
  // -------------mutation-----------
  useUpdateLessonContentMutation,
  useCreateLessonContentMutation,
  useRemoveLessonContentMutation,
  useAddIntegrationMutation,
  useRemoveIntegrationMutation,
} = extendedApi;
