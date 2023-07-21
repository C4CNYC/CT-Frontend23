/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { BaseResponseInterface } from "@utils";

import { adminApi } from ".";
import {
  IContacts,
  OrganizationResponce,
} from "../interfaces/organization.interface";

const extendedApi = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    updateOrgContacts: builder.mutation<
      IContacts & BaseResponseInterface,
      IContacts
    >({
      query: ({ ...body }) => ({
        url: "/org/contact/",
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "OrganizationContacts" }],
    }),
    getOrgContacts: builder.query<IContacts & OrganizationResponce, void>({
      query: () => ({
        url: "/org/contact/",
        method: "GET",
      }),
      providesTags: ["OrganizationContacts"],
    }),
  }),
});
export const { useGetOrgContactsQuery, useUpdateOrgContactsMutation } =
  extendedApi;
