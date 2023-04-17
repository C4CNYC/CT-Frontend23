/* eslint-disable @typescript-eslint/no-invalid-void-type */
import {
  BaseListResponseInterface,
  BaseResponseInterface,
} from "src/utils/baseResponce.interface";
import { managerApi } from ".";
import {
  IIntegration,
  IIntegrationSearch,
} from "../interfaces/integration.interface";

const extendedApi = managerApi.injectEndpoints({
  endpoints: (builder) => ({
    getIntegrations: builder.query<
      BaseListResponseInterface<IIntegration & BaseResponseInterface>,
      IIntegrationSearch
    >({
      query: (params) => ({
        url: "/integration",
        method: "GET",
        params,
      }),
      providesTags: ["Integrations"],
    }),
    createIntegration: builder.mutation<IIntegration, IIntegration>({
      query: ({ ...body }) => ({
        url: "/integration",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Integrations" }],
    }),
    updateIntegration: builder.mutation<
      IIntegration,
      { id: string } & IIntegration
    >({
      query: ({ id, ...body }) => ({
        url: `/integration/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "Integrations" }],
    }),
    removeIntegration: builder.mutation<
      IIntegration,
      { integration_id: string }
    >({
      query: ({ integration_id }) => ({
        url: `/integration/${integration_id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Integrations" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetIntegrationsQuery,
  // -------------mutation-----------
  useCreateIntegrationMutation,
  useRemoveIntegrationMutation,
  useUpdateIntegrationMutation,
} = extendedApi;
