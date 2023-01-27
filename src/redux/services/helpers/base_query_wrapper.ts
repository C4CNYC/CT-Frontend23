import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { RootState } from "../../store";

const ORGANIZATION_ID_HEADER_KEY = "x-org-id";
const AUTHORIZATION_HEADER_KEY = "authorization";
const TENANT_ID_HEADER_KEY = "x-tenant-id";

export const baseQueryWrapper = (baseUrl: string) =>
  fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const org_id = (getState() as RootState).global.org_id;
      const token = localStorage.getItem("accessToken") || "";
      const tenantName = localStorage.getItem("tenantName") || "";

      headers.set(AUTHORIZATION_HEADER_KEY, `Bearer ${token}`);
      headers.set(ORGANIZATION_ID_HEADER_KEY, org_id);
      headers.set(TENANT_ID_HEADER_KEY, tenantName);

      return headers;
    },
  });
