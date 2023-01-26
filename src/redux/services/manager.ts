import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWrapper } from "./helpers/base_query_wrapper";
import { baseQueryWithAuth } from "./helpers/query_with_auth";

export const managerApi = createApi({
  reducerPath: "api/manager",
  baseQuery: baseQueryWithAuth(
    baseQueryWrapper(`${process.env.NEXT_PUBLIC_API_URL}`)
  ),
  endpoints: (builder) => ({}),
});

export const {} = managerApi;
