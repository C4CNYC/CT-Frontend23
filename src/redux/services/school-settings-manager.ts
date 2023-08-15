import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQueryWrapper } from "./helpers/base_query_wrapper";
import { baseQueryWithAuth } from "./helpers/query_with_auth";

export const schoolSettingsApi = createApi({
  reducerPath: "api/tenant",
  baseQuery: baseQueryWithAuth(
    baseQueryWrapper(`${process.env.NEXT_PUBLIC_API_URL}/school`)
  ),
  endpoints: (builder) => ({
    getSchoolSettings: builder.query({
      query: ({ id }) => ({
        url: `/student/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetSchoolSettingsQuery } = schoolSettingsApi;
