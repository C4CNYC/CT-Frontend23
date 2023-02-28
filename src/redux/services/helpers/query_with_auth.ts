import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

export const baseQueryWithAuth: (
  baseQuery: any
) => BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =
  (baseQuery) =>
  async (args: any, api: any, extraOptions: any): Promise<any> => {
    const result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
      window.location.pathname = "/";
    }
    return result;
  };
