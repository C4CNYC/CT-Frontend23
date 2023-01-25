import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseResponseInterface } from "src/utils/baseResponce.interface";
import { baseQueryWrapper } from "./helpers/base_query_wrapper";
import { baseQueryWithAuth } from "./helpers/query_with_auth";

export interface ClassResponce extends BaseResponseInterface {
  name: string;
}
export interface ClassRequest {
  name: string;
  schoolId: string;
  org_id: string;
}

export const managerApi = createApi({
  reducerPath: "api/manager",
  baseQuery: baseQueryWithAuth(
    baseQueryWrapper(`${process.env.NEXT_PUBLIC_API_URL}`)
  ),
  endpoints: (builder) => ({
    createClass: builder.mutation<ClassResponce, ClassRequest>({
      query: ({ schoolId, org_id, ...body }) => ({
        url: `admin/org/${org_id}/school/${schoolId}/class`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCreateClassMutation } = managerApi;
