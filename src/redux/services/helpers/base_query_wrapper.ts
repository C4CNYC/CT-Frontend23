import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { RootState } from "../../store";

export const baseQueryWrapper = (baseUrl: string) =>
  fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      const tenantName = localStorage.getItem("tenantName");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      if (tenantName) {
        headers.set("x-tenant-id", tenantName);
      }
      return headers;
    },
  });
