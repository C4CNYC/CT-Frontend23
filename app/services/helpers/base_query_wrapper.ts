import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { RootState } from "../../store";

export const baseQueryWrapper = (baseUrl: string) =>
  fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });
