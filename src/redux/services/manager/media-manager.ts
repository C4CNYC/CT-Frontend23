import { BaseListResponseInterface, BaseResponseInterface } from "@utils";

import { managerApi } from ".";
import {
  IMedia,
  IMediaCreate,
  IMediaDelete,
  IMediaPathUpdate,
  IMediaSearchParams,
  IMediaUpdate,
} from "../interfaces/media.interface";

const extendedApi = managerApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllMedia: builder.query<
      BaseListResponseInterface<IMedia & BaseResponseInterface>,
      IMediaSearchParams
    >({
      query: (params) => ({
        url: "/manager/media",
        method: "GET",
        params,
      }),
      keepUnusedDataFor: 0,
      providesTags: ["Media"],
    }),
    getMedia: builder.query<IMedia & BaseResponseInterface, { id: string }>({
      query: ({ id }) => ({
        url: `/manager/media/${id}`,
        method: "GET",
      }),
      keepUnusedDataFor: 0,
      providesTags: ["Media"],
    }),
    updateMedia: builder.mutation<
      IMedia & BaseResponseInterface,
      IMediaUpdate
    >({
      query: ({ id, ...body }) => ({
        url: `/manager/media/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "Media" }],
    }),
    updateMediaPath: builder.mutation<
      IMedia & BaseResponseInterface,
      IMediaPathUpdate
    >({
      query: (body) => ({
        url: `/manager/media/path`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "Media" }],
    }),
    createMedia: builder.mutation<
      IMediaCreate & BaseResponseInterface,
      IMediaCreate
    >({
      query: ({ ...body }) => ({
        url: "/manager/media",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Media" }],
    }),
    deleteMedia: builder.mutation<
      IMediaDelete & BaseResponseInterface,
      IMediaDelete
    >({
      query: ({ id }) => ({
        url: `/manager/media/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Media" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllMediaQuery,
  useGetMediaQuery,
  // -------------mutation-----------
  useCreateMediaMutation,
  useUpdateMediaPathMutation,
  useUpdateMediaMutation,
  useDeleteMediaMutation,
} = extendedApi;
