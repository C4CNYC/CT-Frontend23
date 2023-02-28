/* eslint-disable @typescript-eslint/no-invalid-void-type */
import {
  BaseListResponseInterface,
  BaseResponseInterface,
} from "src/utils/baseResponce.interface";
import { managerApi } from ".";
import {
  IAddModuleToCourse,
  ICourse,
  ICourseCreate,
  ICourseDelete,
  ICourseSearchParams,
  IRemoveModuleFromCourse,
} from "../interfaces/courseUnits.interface";

const extendedApi = managerApi.injectEndpoints({
  endpoints: (builder) => ({
    getCourse: builder.query<
      BaseListResponseInterface<ICourse & BaseResponseInterface>,
      ICourseSearchParams
    >({
      query: (params) => ({
        url: "/course",
        method: "GET",
        params,
      }),
      providesTags: ["Courses"],
    }),
    updateCourse: builder.mutation<
      ICourse & BaseResponseInterface,
      { id: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/course/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "Courses" }],
    }),
    createCourse: builder.mutation<
      ICourseCreate & BaseResponseInterface,
      ICourseCreate
    >({
      query: ({ ...body }) => ({
        url: "/course",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Courses" }],
    }),
    deleteCourse: builder.mutation<
      ICourseDelete & BaseResponseInterface,
      ICourseDelete
    >({
      query: ({ id }) => ({
        url: `/course/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Courses" }],
    }),
    addModuleToCourse: builder.mutation<void, IAddModuleToCourse>({
      query: ({ id, ...body }) => ({
        url: `/course/${id}/unit`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "Modules" }],
    }),
    removeModuleFromCourse: builder.mutation<void, IRemoveModuleFromCourse>({
      query: ({ id, ...body }) => ({
        url: `/course/${id}/unit`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: [{ type: "Modules" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCourseQuery,
  // -------------mutation-----------
  useAddModuleToCourseMutation,
  useRemoveModuleFromCourseMutation,
  useCreateCourseMutation,
  useDeleteCourseMutation,
  useUpdateCourseMutation,
} = extendedApi;
