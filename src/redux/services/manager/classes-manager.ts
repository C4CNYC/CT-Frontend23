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
import { ClassRequest } from "../interfaces/school.interface";

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
    createClasses: builder.mutation<
      IClass & BaseResponseInterface,
      Omit<ClassRequest, "classId">
    >({
      query: ({ schoolId, ...body }) => ({
        url: `/school/${schoolId}/class`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Classes"],
    }),
    updateClasses: builder.mutation<
      IClass & BaseResponseInterface,
      ClassRequest
    >({
      query: ({ schoolId, classId, ...body }) => ({
        url: `/school/${schoolId}/class/${classId}`,
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
        url: `/school/${schoolId}/class/${classId}/avatar`,
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
  useUpdateClassesAvatarMutation,
} = extendedApi;
