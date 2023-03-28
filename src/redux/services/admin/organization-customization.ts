import { BaseResponseInterface } from "src/utils/baseResponce.interface";
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
