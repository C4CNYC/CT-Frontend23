/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { BaseResponseInterface } from "@utils";

import { adminApi } from ".";
import {
  ISettings,
  OrganizationResponce,
} from "../interfaces/organization.interface";

const extendedApi = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    updateOrgSettings: builder.mutation<
      ISettings & BaseResponseInterface,
      ISettings
    >({
      query: ({ ...body }) => ({
        url: "/org/setting/",
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "OrganizationSettings" }],
    }),
    getOrgSettings: builder.query<ISettings & OrganizationResponce, void>({
      query: () => ({
        url: "/org/setting/",
        method: "GET",
      }),
      providesTags: ["OrganizationSettings"],
    }),
  }),
});

export const { useGetOrgSettingsQuery, useUpdateOrgSettingsMutation } =
  extendedApi;
