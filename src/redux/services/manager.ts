import { createApi } from "@reduxjs/toolkit/query/react";
import { BaseListResponseInterface } from "src/utils/baseResponce.interface";
import { baseQueryWrapper } from "./helpers/base_query_wrapper";
import { baseQueryWithAuth } from "./helpers/query_with_auth";
import { SchoolResponce } from "./interfaces/school.interface";

export const managerApi = createApi({
  reducerPath: "api/manager",
  baseQuery: baseQueryWithAuth(
    baseQueryWrapper(`${process.env.NEXT_PUBLIC_API_URL}/manager`)
  ),
  tagTypes: ["School"],
  endpoints: (builder) => ({
    getMySchools: builder.query<
      BaseListResponseInterface<SchoolResponce>,
      void
    >({
      query: () => ({
        url: `/school`,
        method: "GET",
      }),
      providesTags: ["School"],
    }),
  }),
});

export const {
  useGetMySchoolsQuery,
  //---------------- mutations --------------
} = managerApi;
