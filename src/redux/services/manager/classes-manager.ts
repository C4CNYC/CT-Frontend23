/* eslint-disable @typescript-eslint/no-invalid-void-type */
import {
  BaseListResponseInterface,
  BaseResponseInterface,
} from "src/utils/baseResponce.interface";
import { managerApi } from ".";
import { ClassSearchParams, IClass } from "../interfaces/class.interface";

const extendedApi = managerApi.injectEndpoints({
  endpoints: (builder) => ({
    getClasses: builder.query<
      BaseListResponseInterface<IClass & BaseResponseInterface>,
      { schoolId: string } & ClassSearchParams
    >({
      query: ({ schoolId, ...params }) => ({
        url: `/school/${schoolId}/class`,
        method: "GET",
        params,
      }),
      providesTags: ["Classes"],
    }),
    createClasses: builder.mutation<void, { schoolId: string; name: string }>({
      query: ({ schoolId, ...body }) => ({
        url: `/school/${schoolId}/class`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Classes"],
    }),
    updateClasses: builder.mutation<
      void,
      { schoolId: string; classId: string; name: string }
    >({
      query: ({ schoolId, classId, ...body }) => ({
        url: `/school/${schoolId}/class/${classId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Classes"],
    }),
    deleteClasses: builder.mutation<
      void,
      { schoolId: string; classId: string }
    >({
      query: ({ schoolId, classId }) => ({
        url: `/school/${schoolId}/class/${classId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Classes"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetClassesQuery,
  // -------------mutation-----------
  useDeleteClassesMutation,
  useUpdateClassesMutation,
  useCreateClassesMutation,
} = extendedApi;
