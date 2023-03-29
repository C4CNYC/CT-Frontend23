/* eslint-disable @typescript-eslint/no-invalid-void-type */
import {
  BaseListResponseInterface,
  BaseResponseInterface,
} from "src/utils/baseResponce.interface";
import { managerApi } from ".";
import { IIntegration } from "../interfaces/integration.interface";

const extendedApi = managerApi.injectEndpoints({
  endpoints: (builder) => ({
    getIntegrations: builder.query<
      BaseListResponseInterface<IIntegration & BaseResponseInterface>,
      void
    >({
      query: () => ({
        url: "/integration",
        method: "GET",
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
      { lessonId: string; id: string }
    >({
      query: ({ id }) => ({
        url: `/integration/${id}`,
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
