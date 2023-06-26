/* eslint-disable @typescript-eslint/no-invalid-void-type */

import { BaseResponseInterface } from "@ct-nx/utils";
import { managerApi } from ".";
import {
  IAssignment,
  IAssignmentCreate,
  IAssignmentUpdate,
} from "../interfaces/assignment.interface";

const extendedApi = managerApi.injectEndpoints({
  endpoints: (builder) => ({
    getAssignment: builder.query<
      IAssignment & BaseResponseInterface,
      { schoolId: string; assignmentId: string }
    >({
      query: ({ schoolId, assignmentId }) => ({
        url: `/school/${schoolId}/assignment/${assignmentId}`,
        method: "GET",
      }),
      providesTags: ["Assignment"],
    }),
    getAssignmentList: builder.query<
      Array<IAssignment & BaseResponseInterface>,
      { schoolId: string }
    >({
      query: ({ schoolId }) => ({
        url: `/school/${schoolId}/assignment`,
        method: "GET",
      }),
      providesTags: ["Assignments"],
    }),
    createAssignment: builder.mutation<
      IAssignment & BaseResponseInterface,
      {
        schoolId: string;
      } & IAssignmentCreate
    >({
      query: ({ schoolId, ...body }) => ({
        url: `/school/${schoolId}/assignment/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Assignments"],
    }),
    udpateAssignment: builder.mutation<
      void,
      {
        assignmentId: string;
        schoolId: string;
      } & IAssignmentUpdate
    >({
      query: ({ schoolId, assignmentId, ...body }) => ({
        url: `/school/${schoolId}/assignment/${assignmentId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Assignments", "Assignment"],
    }),
    udpateLessonAssignment: builder.mutation<
      void,
      {
        assignmentId: string;
        schoolId: string;
        lesson_id: string;
      }
    >({
      query: ({ schoolId, assignmentId, ...body }) => ({
        url: `/school/${schoolId}/assignment/${assignmentId}/lesson`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Assignment"],
    }),
    udpateTaskAssignment: builder.mutation<
      void,
      {
        assignmentId: string;
        schoolId: string;
        task_id: string;
      }
    >({
      query: ({ schoolId, assignmentId, ...body }) => ({
        url: `/school/${schoolId}/assignment/${assignmentId}/task`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Assignment"],
    }),
    udpateClassAssignment: builder.mutation<
      void,
      {
        assignmentId: string;
        schoolId: string;
        class_id: string;
      }
    >({
      query: ({ schoolId, assignmentId, ...body }) => ({
        url: `/school/${schoolId}/assignment/${assignmentId}/class`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Assignment"],
    }),
    removeClassAssignment: builder.mutation<
      void,
      {
        assignmentId: string;
        schoolId: string;
        class_id: string;
      }
    >({
      query: ({ schoolId, assignmentId, ...body }) => ({
        url: `/school/${schoolId}/assignment/${assignmentId}/class`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Assignment"],
    }),
    deleteAssignment: builder.mutation<
      void,
      { schoolId: string; assignmentId: string }
    >({
      query: ({ schoolId, assignmentId }) => ({
        url: `/school/${schoolId}/assignment/${assignmentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Assignments"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAssignmentListQuery,
  useGetAssignmentQuery,
  // -------------mutation-----------
  useRemoveClassAssignmentMutation,
  useUdpateClassAssignmentMutation,
  useUdpateLessonAssignmentMutation,
  useUdpateTaskAssignmentMutation,
  useCreateAssignmentMutation,
  useDeleteAssignmentMutation,
  useUdpateAssignmentMutation,
} = extendedApi;
