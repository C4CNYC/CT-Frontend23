/* eslint-disable @typescript-eslint/no-invalid-void-type */
import {
  BaseListResponseInterface,
  BaseResponseInterface,
} from "src/utils/baseResponce.interface";
import { managerApi } from ".";
import { IProgress, IProgressSearch } from "../interfaces/progress.interface";

const extendedApi = managerApi.injectEndpoints({
  endpoints: (builder) => ({
    getProgress: builder.query<
      BaseListResponseInterface<IProgress & BaseResponseInterface>,
      IProgressSearch
    >({
      query: (params) => ({
        url: "/progress",
        method: "GET",
        params,
      }),
      keepUnusedDataFor: 0,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetProgressQuery,
  // -------------mutation-----------
} = extendedApi;
