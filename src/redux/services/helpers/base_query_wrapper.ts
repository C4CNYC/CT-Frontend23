import { BaseQueryFn, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";

const AUTHORIZATION_HEADER_KEY = "authorization";
const TENANT_ID_HEADER_KEY = "x-tenant-id";

export const baseQueryWrapper = (baseUrl: string): BaseQueryFn =>
  fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken") ?? "";
      const tenantName = localStorage.getItem("tenantName") ?? "codetribe";

      headers.set(AUTHORIZATION_HEADER_KEY, `Bearer ${token}`);
      headers.set(TENANT_ID_HEADER_KEY, tenantName);

      return headers;
    },
  });
