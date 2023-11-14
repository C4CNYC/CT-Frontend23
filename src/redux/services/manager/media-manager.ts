import { BaseListResponseInterface, BaseResponseInterface } from "@utils";

import { managerApi } from ".";
import {
  IMedia,
  IMediaCreate,
  IMediaDelete,
  IMediaSearchParams,
  IMediaUpdate,
} from "../interfaces/media.interface";

const extendedApi = managerApi.injectEndpoints({
  endpoints: (builder) => ({
    getMedias: builder.query<
      BaseListResponseInterface<IMedia & BaseResponseInterface>,
      IMediaSearchParams
    >({
      query: (params) => ({
        url: "/manager/media",
        method: "GET",
        params,
      }),
      keepUnusedDataFor: 0,
      providesTags: ["Medias"],
    }),
    getMedia: builder.query<IMedia & BaseResponseInterface, { id: string }>({
      query: ({ id }) => ({
        url: `/manager/media/${id}`,
        method: "GET",
      }),
      keepUnusedDataFor: 0,
      providesTags: ["Medias"],
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
      invalidatesTags: [{ type: "Medias" }],
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
      invalidatesTags: [{ type: "Medias" }],
    }),
    deleteMedia: builder.mutation<
      IMediaDelete & BaseResponseInterface,
      IMediaDelete
    >({
      query: ({ id }) => ({
        url: `/manager/media/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Medias" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetMediasQuery,
  useGetMediaQuery,
  // -------------mutation-----------
  useCreateMediaMutation,
  useUpdateMediaMutation,
  useDeleteMediaMutation,
} = extendedApi;
