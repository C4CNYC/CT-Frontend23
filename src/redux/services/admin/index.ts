import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQueryWrapper } from "../helpers/base_query_wrapper";
import { baseQueryWithAuth } from "../helpers/query_with_auth";

export const adminApi = createApi({
  reducerPath: "api/admin",
  baseQuery: baseQueryWithAuth(
    baseQueryWrapper(`${process.env.NEXT_PUBLIC_API_URL}/admin`)
  ),
  tagTypes: [
    "Organization",
    "School",
    "Members",
    "Teachers",
    "Classes",
    "OrganizationContacts",
    "OrganizationSettings",
    "OrganizationCustomization",
  ],
  endpoints: (builder) => ({}),
});
