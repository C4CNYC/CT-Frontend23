/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { BaseResponseInterface } from "@utils";

import { managerApi } from ".";
import { ILessonContent } from "../interfaces/courseUnits.interface";
import { ILessonContentValidation } from "../interfaces/lessonContentValidation.interface";

const extendedApi = managerApi.injectEndpoints({
  endpoints: (builder) => ({
    getLessonContentValidationsManager: builder.query<
      Array<ILessonContentValidation & BaseResponseInterface>,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/manager/content/${id}/validation`,
        method: "GET",
      }),
      providesTags: ["LessonsContentValidation"],
    }),
    createLessonContentValidationManager: builder.mutation<
      ILessonContent,
      { id: string } & ILessonContentValidation
    >({
      query: ({ id, ...body }) => ({
        url: `/manager/content/${id}/validation`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "LessonsContentValidation" }],
    }),
    updateLessonContentValidationManager: builder.mutation<
      ILessonContentValidation,
      { contentId: string; id: string } & ILessonContentValidation
    >({
      query: ({ contentId, id, ...body }) => ({
        url: `/manager/content/${contentId}/validation/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "LessonsContentValidation" }],
    }),
    removeLessonContentValiationManager: builder.mutation<
      ILessonContentValidation,
      { contentId: string; id: string }
    >({
      query: ({ contentId, id }) => ({
        url: `/manager/content/${contentId}/validation/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "LessonsContentValidation" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetLessonContentValidationsManagerQuery,
  // -------------mutation-----------
  useCreateLessonContentValidationManagerMutation,
  useRemoveLessonContentValiationManagerMutation,
  useUpdateLessonContentValidationManagerMutation,
} = extendedApi;
