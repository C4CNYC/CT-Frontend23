import { createApi } from "@reduxjs/toolkit/query/react";

import { BaseResponseInterface } from "@utils";
import { IClass } from "src/redux/interfaces/class.interface";

import { baseQueryWrapper } from "../helpers/base_query_wrapper";

export const publicApi = createApi({
  reducerPath: "api/",
  baseQuery: baseQueryWrapper(`${process.env.NEXT_PUBLIC_API_URL}/`),
  tagTypes: [],
  endpoints: (builder) => ({
    getPublicTribe: builder.query<
      IClass & BaseResponseInterface,
      { joinCode: string }
    >({
      query: ({ joinCode }) => ({
        url: `class/${joinCode}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetPublicTribeQuery } = publicApi;
