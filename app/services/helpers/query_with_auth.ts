import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { logout } from "../../slices/auth";

export const baseQueryWithAuth: (
  baseQuery: any
) => BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =
  (baseQuery) => async (args: any, api: any, extraOptions: any) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
      api.dispatch(logout());
      window.location.pathname = "/";
    }
    return result;
  };
