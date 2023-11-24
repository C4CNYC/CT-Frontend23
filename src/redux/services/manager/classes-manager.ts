/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { BaseListResponseInterface, BaseResponseInterface } from "@utils";
import {
  ClassSearchParams,
  IAddCourseToClass,
  IClass,
  IRemoveCourseFromClass,
} from "src/redux/interfaces/class.interface";

import { managerApi } from ".";
import { ClassRequest } from "../interfaces/school.interface";

const extendedApi = managerApi.injectEndpoints({
  endpoints: (builder) => ({
    getClasses: builder.query<
      BaseListResponseInterface<IClass & BaseResponseInterface>,
      { schoolId: string } & ClassSearchParams
    >({
      query: ({ schoolId, ...params }) => ({
        url: `/manager/school/${schoolId}/class`,
        method: "GET",
        params,
      }),
      keepUnusedDataFor: 0,
      providesTags: ["Classes"],
    }),
    createClasses: builder.mutation<
      IClass & BaseResponseInterface,
      Omit<ClassRequest, "classId">
    >({
      query: ({ schoolId, ...body }) => ({
        url: `/manager/school/${schoolId}/class`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Classes", "ClassesStudent"],
    }),
    updateClasses: builder.mutation<
      IClass & BaseResponseInterface,
      ClassRequest
    >({
      query: ({ schoolId, classId, ...body }) => ({
        url: `/manager/school/${schoolId}/class/${classId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Classes"],
    }),
    updateClassesAvatar: builder.mutation<
      void,
      { schoolId: string; classId: string; file: FormData }
    >({
      query: ({ schoolId, classId, file }) => ({
        url: `/manager/school/${schoolId}/class/${classId}/avatar`,
        method: "PATCH",
        body: file,
      }),
      invalidatesTags: ["Classes"],
    }),
    deleteClasses: builder.mutation<
      void,
      { schoolId: string; classId: string }
    >({
      query: ({ schoolId, classId }) => ({
        url: `/manager/school/${schoolId}/class/${classId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Classes"],
    }),
    updateClassesSettings: builder.mutation<
      void,
      { schoolId: string; classId: string; request_join_enable: boolean }
    >({
      query: ({ schoolId, classId, ...body }) => ({
        url: `/manager/school/${schoolId}/class/${classId}/setting`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Courses", "Classes"],
    }),
    addCourseToClass: builder.mutation<void, IAddCourseToClass>({
      query: ({ id, ...body }) => ({
        url: `/manager/school/{schoolId}/class/${id}/course`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Courses", "Classes", "CoursesManager"],
    }),
    removeCourseFromClass: builder.mutation<void, IRemoveCourseFromClass>({
      query: ({ id, ...body }) => ({
        url: `/manager/school/{schoolId}/class/${id}/course`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Courses", "Classes", "CoursesManager"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetClassesQuery,
  // -------------mutation-----------
  useAddCourseToClassMutation,
  useRemoveCourseFromClassMutation,
  useUpdateClassesSettingsMutation,
  useDeleteClassesMutation,
  useUpdateClassesMutation,
  useCreateClassesMutation,
  useUpdateClassesAvatarMutation,
} = extendedApi;
