/* eslint-disable @typescript-eslint/no-invalid-void-type */
import {
  BaseListResponseInterface,
  BaseResponseInterface,
} from "src/utils/baseResponce.interface";
import { managerApi } from ".";
import {
  IProgress,
  IProgressContent,
  IProgressSearch,
} from "../interfaces/progress.interface";

const extendedApi = managerApi.injectEndpoints({
  endpoints: (builder) => ({
    getProgress: builder.query<
      BaseListResponseInterface<IProgress & BaseResponseInterface>,
      IProgressSearch & { id: string }
    >({
      query: ({ id, ...params }) => ({
        url: `course/${id}/progress`,
        method: "GET",
      }),
      keepUnusedDataFor: 0,
    }),
    getProgressContent: builder.query<
      IProgressContent & BaseResponseInterface,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `course/${id}/progress/content`,
        method: "GET",
      }),
      keepUnusedDataFor: 0,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetProgressQuery,
  useGetProgressContentQuery,
  // -------------mutation-----------
} = extendedApi;
