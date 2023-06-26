/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { adminApi } from ".";
import {
  OrganizationRequest,
  OrganizationResponce,
} from "../interfaces/organization.interface";

const extendedApi = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrganization: builder.query<OrganizationResponce, void>({
      query: () => ({
        url: "/org",
        method: "GET",
      }),
      providesTags: ["Organization"],
    }),
    createOrganization: builder.mutation<
      OrganizationResponce,
      OrganizationRequest
    >({
      query: (body) => ({
        url: "/org",
        method: "POST",
        body,
      }),
    }),
    updateOrganization: builder.mutation<
      OrganizationResponce,
      {
        body: OrganizationRequest;
      }
    >({
      query: (data) => ({
        url: "/org",
        method: "PATCH",
        body: data.body,
      }),
      invalidatesTags: [{ type: "Organization" }],
    }),
    updateOrgAvatar: builder.mutation<
      void,
      {
        file: FormData;
      }
    >({
      query: ({ file }) => ({
        url: "/org/avatar",
        method: "PATCH",
        headers: {
          // "Content-Type": "multipart/form-data",
        },
        body: file,
      }),
      invalidatesTags: [{ type: "Organization" }],
    }),
    updateOrgCover: builder.mutation<
      void,
      {
        file: FormData;
      }
    >({
      query: ({ file }) => ({
        url: "/org/cover",
        method: "PATCH",
        body: file,
      }),
      invalidatesTags: [{ type: "Organization" }],
    }),
  }),
});

export const {
  useGetOrganizationQuery,
  useCreateOrganizationMutation,
  useUpdateOrganizationMutation,
  useUpdateOrgAvatarMutation,
  useUpdateOrgCoverMutation,
} = extendedApi;
