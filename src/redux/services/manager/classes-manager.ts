/* eslint-disable @typescript-eslint/no-invalid-void-type */
import {
  BaseListResponseInterface,
  BaseResponseInterface,
} from "src/utils/baseResponce.interface";
import { managerApi } from ".";
import {
  ClassSearchParams,
  IAddCourseToClass,
  IClass,
  IRemoveCourseFromClass,
} from "../interfaces/class.interface";

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
      keepUnusedDataFor: 0,
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
    addCourseToClass: builder.mutation<void, IAddCourseToClass>({
      query: ({ schoolId, id, ...body }) => ({
        url: `/school/${schoolId}/class/${id}/course`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Courses", "Classes"],
    }),
    removeCourseFromClass: builder.mutation<void, IRemoveCourseFromClass>({
      query: ({ schoolId, id, ...body }) => ({
        url: `/school/${schoolId}/class/${id}/course`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Courses", "Classes"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetClassesQuery,
  // -------------mutation-----------
  useAddCourseToClassMutation,
  useRemoveCourseFromClassMutation,
  useDeleteClassesMutation,
  useUpdateClassesMutation,
  useCreateClassesMutation,
} = extendedApi;
