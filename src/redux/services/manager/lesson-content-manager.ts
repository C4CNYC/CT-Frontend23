/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { BaseResponseInterface } from "src/utils/baseResponce.interface";
import { managerApi } from ".";
import { ILessonContent } from "../interfaces/courseUnits.interface";

const extendedApi = managerApi.injectEndpoints({
  endpoints: (builder) => ({
    getLessonContent: builder.query<
      ILessonContent & BaseResponseInterface,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/lesson/${id}/content`,
        method: "GET",
      }),
      providesTags: ["Lessons"],
    }),
    updateLessonContent: builder.mutation<ILessonContent, { id: string }>({
      query: ({ id, ...body }) => ({
        url: `/lesson/${id}/content`,
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
