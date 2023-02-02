import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { RootState } from "../../store";

const AUTHORIZATION_HEADER_KEY = "authorization";
const TENANT_ID_HEADER_KEY = "x-tenant-id";

export const baseQueryWrapper = (baseUrl: string) =>
  fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken") || "";
      const tenantName = localStorage.getItem("tenantName") || "";

      headers.set(AUTHORIZATION_HEADER_KEY, `Bearer ${token}`);
      headers.set(TENANT_ID_HEADER_KEY, tenantName);

      return headers;
    },
  });
