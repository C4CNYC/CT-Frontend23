/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { BaseListResponseInterface, BaseResponseInterface } from "@utils";
import {
  IModule,
  IModulesSearchParams,
} from "src/redux/interfaces/content.interface";

import { studentApi } from ".";

const extendedApi = studentApi.injectEndpoints({
  endpoints: (builder) => ({
    getModuleWithLessons: builder.query<
      IModule & BaseResponseInterface,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/module/${id}`,
        method: "GET",
      }),
    }),
    getModulesList: builder.query<
      BaseListResponseInterface<IModule & BaseResponseInterface>,
      IModulesSearchParams
    >({
      query: (params) => ({
        url: "/content/module",
        method: "GET",
        params,
      }),
      keepUnusedDataFor: 0,
      providesTags: ["Modules"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetModuleWithLessonsQuery,
  useGetModulesListQuery,
  // -------------mutation-----------
} = extendedApi;
