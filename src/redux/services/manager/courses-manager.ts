/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { BaseResponseInterface } from "src/utils/baseResponce.interface";
import { managerApi } from ".";
import { IModule } from "../interfaces/class.interface";
import {
  ICourse,
  ICourseCreate,
  ICourseDelete,
} from "../interfaces/courseUnits.interface";

const extendedApi = managerApi.injectEndpoints({
  endpoints: (builder) => ({
    getCourse: builder.query<IModule, void>({
      query: () => ({
        url: "/course",
        method: "GET",
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
  }),
  overrideExisting: false,
});

export const {
  useGetCourseQuery,
  // -------------mutation-----------
  useCreateCourseMutation,
  useDeleteCourseMutation,
  useUpdateCourseMutation,
} = extendedApi;
