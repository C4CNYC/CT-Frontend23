/* eslint-disable @typescript-eslint/no-invalid-void-type */
import {
  BaseListResponseInterface,
  BaseResponseInterface,
} from "src/utils/baseResponce.interface";
import { managerApi } from ".";
import { IModule } from "../interfaces/class.interface";
import {
  IAddLessonToModule,
  IModuleCreate,
  IModuleDelete,
  IModulesSearchParams,
  IRemoveLessonFromModule,
} from "../interfaces/courseUnits.interface";

const extendedApi = managerApi.injectEndpoints({
  endpoints: (builder) => ({
    getModules: builder.query<
      BaseListResponseInterface<IModule & BaseResponseInterface>,
      IModulesSearchParams
    >({
      query: (params) => ({
        url: "/module",
        method: "GET",
        params,
      }),
      keepUnusedDataFor: 0,
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
    addLessonToModule: builder.mutation<void, IAddLessonToModule>({
      query: ({ id, ...body }) => ({
        url: `/module/${id}/lesson`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "Lessons" }],
    }),
    removeLessonFromModule: builder.mutation<void, IRemoveLessonFromModule>({
      query: ({ id, ...body }) => ({
        url: `/module/${id}/lesson`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: [{ type: "Lessons" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetModulesQuery,
  // -------------mutation-----------
  useAddLessonToModuleMutation,
  useRemoveLessonFromModuleMutation,
  useCreateModuleMutation,
  useDeleteModuleMutation,
  useUpdateModuleMutation,
} = extendedApi;
