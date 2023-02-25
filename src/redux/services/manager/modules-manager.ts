/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { BaseResponseInterface } from "src/utils/baseResponce.interface";
import { managerApi } from ".";
import { IModule } from "../interfaces/class.interface";
import {
  IModuleCreate,
  IModuleDelete,
} from "../interfaces/courseUnits.interface";

const extendedApi = managerApi.injectEndpoints({
  endpoints: (builder) => ({
    getModules: builder.query<IModule, void>({
      query: () => ({
        url: "/module",
        method: "GET",
      }),
      providesTags: ["Modules"],
    }),
    updateModule: builder.mutation<
      IModule & BaseResponseInterface,
      { id: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/module/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "Modules" }],
    }),
    createModule: builder.mutation<
      IModuleCreate & BaseResponseInterface,
      IModuleCreate
    >({
      query: ({ ...body }) => ({
        url: "/module",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Modules" }],
    }),
    deleteModule: builder.mutation<
      IModuleDelete & BaseResponseInterface,
      IModuleDelete
    >({
      query: ({ id }) => ({
        url: `/module/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Modules" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetModulesQuery,
  // -------------mutation-----------
  useCreateModuleMutation,
  useDeleteModuleMutation,
  useUpdateModuleMutation,
} = extendedApi;
