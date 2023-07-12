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
        url: "/author",
        method: "GET",
        params,
      }),
      keepUnusedDataFor: 0,
      providesTags: ["Author"],
    }),
    updateAuthor: builder.mutation<
      IAuthor & BaseResponseInterface,
      Omit<IAuthor, "avatar" | "email">
    >({
      query: ({ id, ...body }) => ({
        url: `/author/${id}`,
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
        url: `/author/${id}/cover`,
        method: "PATCH",
        body: file,
      }),
      invalidatesTags: [{ type: "Author" }],
    }),
    createAuthor: builder.mutation<
      IAuthor & BaseResponseInterface,
      Omit<IAuthor, "avatar" | "id">
    >({
      query: ({ ...body }) => ({
        url: "/author",
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
        url: `/author/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Author" }],
    }),
    addAuthorToCourse: builder.mutation<
      void,
      { id: string; course_id: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/author/${id}/course`,
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
        url: `/author/${id}/course`,
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
