/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { BaseListResponseInterface, BaseResponseInterface } from "@utils";

import { managerApi } from ".";
import {
  IAddLessonToModule,
  IModule,
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
        url: "/manager/module",
        method: "GET",
        params,
      }),
      keepUnusedDataFor: 0,
      providesTags: ["Modules"],
    }),
    updateModule: builder.mutation<
      IModule & BaseResponseInterface,
      { id: string, tips: string[] | [], duration: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/manager/module/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "Modules" }],
    }),
    updateModuleAvatar: builder.mutation<
      IModule & BaseResponseInterface,
      { id: string, file: FormData }
    >({
      query: ({ id, file }) => ({
        url: `/manager/module/${id}/avatar`,
        method: "PATCH",
        body: file,
      }),
      invalidatesTags: [{ type: "Modules" }],
    }),
    createModule: builder.mutation<
      IModuleCreate & BaseResponseInterface,
      IModuleCreate
    >({
      query: ({ ...body }) => ({
        url: "/manager/module",
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
        url: `/manager/module/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Modules" }],
    }),
    addLessonToModule: builder.mutation<void, IAddLessonToModule>({
      query: ({ id, ...body }) => ({
        url: `/manager/module/${id}/lesson`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "Lessons" }],
    }),
    removeLessonFromModule: builder.mutation<void, IRemoveLessonFromModule>({
      query: ({ id, ...body }) => ({
        url: `/manager/module/${id}/lesson`,
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
  useUpdateModuleAvatarMutation,
} = extendedApi;
