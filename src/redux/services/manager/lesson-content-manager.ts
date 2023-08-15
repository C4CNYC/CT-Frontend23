/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { BaseResponseInterface } from "@utils";

import { managerApi } from ".";
import {
  ILessonContent,
  ILessonContentUpdate,
} from "../interfaces/courseUnits.interface";

const extendedApi = managerApi.injectEndpoints({
  endpoints: (builder) => ({
    getLessonContent: builder.query<
      Array<ILessonContent & BaseResponseInterface>,
      { lessonId: string }
    >({
      query: ({ lessonId }) => ({
        url: `/manager/lesson/${lessonId}/content`,
        method: "GET",
      }),
      providesTags: ["LessonsContent"],
      transformResponse: (res: Array<ILessonContent & BaseResponseInterface>) =>
        res.sort((a, b) => a.meta.order - b.meta.order),
    }),
    getLessonContentById: builder.query<
      ILessonContent & BaseResponseInterface,
      { lessonId: string; id: string }
    >({
      query: ({ lessonId, id }) => ({
        url: `/manager/lesson/${lessonId}/content/${id}`,
        method: "GET",
      }),
      providesTags: ["LessonContentItem"],
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
        url: `/manager/lesson/${lessonId}/content`,
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
        url: `/manager/lesson/${lessonId}/content/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "LessonsContent" }],
    }),

    removeLessonContent: builder.mutation<
      ILessonContent,
      { lessonId: string; id: string }
    >({
      query: ({ lessonId, id }) => ({
        url: `/manager/lesson/${lessonId}/content/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "LessonsContent" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetLessonContentQuery,
  useGetLessonContentByIdQuery,
  // -------------mutation-----------
  useUpdateLessonContentMutation,
  useCreateLessonContentMutation,
  useRemoveLessonContentMutation,
} = extendedApi;
