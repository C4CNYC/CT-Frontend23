/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { BaseListResponseInterface, BaseResponseInterface } from "@utils";

import { managerApi } from ".";
import { IAuthor, IAuthorSearchParams } from "../interfaces/author.interface";

const extendedApi = managerApi.injectEndpoints({
  endpoints: (builder) => ({
    getAuthors: builder.query<
      BaseListResponseInterface<IAuthor & BaseResponseInterface>,
      IAuthorSearchParams
    >({
      query: (params) => ({
        url: "/manager/author",
        method: "GET",
        params,
      }),
      providesTags: ["Author"],
    }),
    updateAuthor: builder.mutation<
      IAuthor & BaseResponseInterface,
      Omit<IAuthor, "avatar" | "email">
    >({
      query: ({ id, ...body }) => ({
        url: `/manager/author/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "Author" }],
    }),
    updateAuthorCover: builder.mutation<
      IAuthor & BaseResponseInterface,
      { id: string; file: FormData }
    >({
      query: ({ id, file }) => ({
        url: `/manager/author/${id}/cover`,
        method: "PATCH",
        body: file,
      }),
      invalidatesTags: [{ type: "Author" }],
    }),
    createAuthor: builder.mutation<
      IAuthor & BaseResponseInterface,
      { course_id: string } & Omit<IAuthor, "avatar" | "id">
    >({
      query: ({ ...body }) => ({
        url: "/manager/author",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Author" }],
    }),
    deleteAuthor: builder.mutation<
      IAuthor & BaseResponseInterface,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/manager/author/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Author" }],
    }),
    addAuthorToCourse: builder.mutation<
      void,
      { id: string; course_id: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/manager/author/${id}/course`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "Author" }],
    }),
    removeAuthorFromCourse: builder.mutation<
      void,
      { id: string; course_id: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/manager/author/${id}/course`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: [{ type: "Author" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAuthorsQuery,
  // -----------------
  useAddAuthorToCourseMutation,
  useCreateAuthorMutation,
  useDeleteAuthorMutation,
  useRemoveAuthorFromCourseMutation,
  useUpdateAuthorCoverMutation,
  useUpdateAuthorMutation,
} = extendedApi;
