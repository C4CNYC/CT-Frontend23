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
      keepUnusedDataFor: 0,
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
    updateCourseCover: builder.mutation<
      ICourse & BaseResponseInterface,
      { id: string; file: FormData }
    >({
      query: ({ id, file }) => ({
        url: `/course/${id}/cover`,
        method: "PATCH",
        body: file,
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
    getCouseSkills: builder.query<
      BaseListResponseInterface<{ name: string } & BaseResponseInterface>,
      void
    >({
      query: () => ({
        url: "/course/skills",
        method: "GET",
      }),
      keepUnusedDataFor: 0,
      providesTags: ["Skills"],
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
  useUpdateCourseCoverMutation,
} = extendedApi;
