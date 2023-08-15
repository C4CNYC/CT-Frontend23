/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { BaseListResponseInterface, BaseResponseInterface } from "@utils";

import { managerApi } from ".";
import {
  IIntegration,
  IIntegrationSearch,
} from "../interfaces/integration.interface";

const extendedApi = managerApi.injectEndpoints({
  endpoints: (builder) => ({
    getIntegrationsList: builder.query<
      BaseListResponseInterface<IIntegration & BaseResponseInterface>,
      IIntegrationSearch
    >({
      query: (params) => ({
        url: "/manager/integration",
        method: "GET",
        params,
      }),
      providesTags: ["Integrations"],
    }),
    createIntegration: builder.mutation<IIntegration, IIntegration>({
      query: ({ ...body }) => ({
        url: "/manager/integration",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Integrations" }],
    }),
    editIntegration: builder.mutation<
      IIntegration,
      { id: string } & IIntegration
    >({
      query: ({ id, ...body }) => ({
        url: `/manager/integration/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "Integrations" }],
    }),
    deleteIntegration: builder.mutation<
      IIntegration,
      { integrationId: string }
    >({
      query: ({ integrationId }) => ({
        url: `/manager/integration/${integrationId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Integrations" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetIntegrationsListQuery,
  // -------------mutation-----------
  useCreateIntegrationMutation,
  useDeleteIntegrationMutation,
  useEditIntegrationMutation,
} = extendedApi;
