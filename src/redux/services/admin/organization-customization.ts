import { BaseResponseInterface } from "@utils";

import { adminApi } from ".";
import {
  CustomizationResponce,
  ICustomization,
} from "../interfaces/organization.interface";

const extendedApi = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    updateOrgCustomization: builder.mutation<
      ICustomization & BaseResponseInterface,
      ICustomization
    >({
      query: ({ ...body }) => ({
        url: "/org/custom/",
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "OrganizationCustomization" }],
    }),
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    getOrgCustomization: builder.query<CustomizationResponce, void>({
      query: () => ({
        url: "/org/custom/",
        method: "GET",
      }),
      providesTags: ["OrganizationCustomization"],
    }),
  }),
});

export const {
  useGetOrgCustomizationQuery,
  useUpdateOrgCustomizationMutation,
} = extendedApi;
