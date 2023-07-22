/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { BaseResponseInterface } from "@utils";

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
    updateAssignment: builder.mutation<
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
    updateLessonAssignment: builder.mutation<
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
    updateTaskAssignment: builder.mutation<
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
    updateClassAssignment: builder.mutation<
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
    udpateStudentAssignment: builder.mutation<
      void,
      {
        assignmentId: string;
        schoolId: string;
        student_id: string;
      }
    >({
      query: ({ schoolId, assignmentId, ...body }) => ({
        url: `/school/${schoolId}/assignment/${assignmentId}/student`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Assignment"],
    }),
    removeStudentAssignment: builder.mutation<
      void,
      {
        assignmentId: string;
        schoolId: string;
        student_id: string;
      }
    >({
      query: ({ schoolId, assignmentId, ...body }) => ({
        url: `/school/${schoolId}/assignment/${assignmentId}/class`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Assignment"],
    }),
    updateCourseAssignment: builder.mutation<
      void,
      {
        assignmentId: string;
        schoolId: string;
        course_id: string;
      }
    >({
      query: ({ schoolId, assignmentId, ...body }) => ({
        url: `/school/${schoolId}/assignment/${assignmentId}/course`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Assignment"],
    }),
    removeCourseAssignment: builder.mutation<
      void,
      {
        assignmentId: string;
        schoolId: string;
        course_id: string;
      }
    >({
      query: ({ schoolId, assignmentId, ...body }) => ({
        url: `/school/${schoolId}/assignment/${assignmentId}/course`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Assignment"],
    }),
    updateSkillAssignment: builder.mutation<
      void,
      {
        assignmentId: string;
        schoolId: string;
        skill_id: string;
      }
    >({
      query: ({ schoolId, assignmentId, ...body }) => ({
        url: `/school/${schoolId}/assignment/${assignmentId}/skill`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Assignment"],
    }),
    removeSkillAssignment: builder.mutation<
      void,
      {
        assignmentId: string;
        schoolId: string;
        skill_id: string;
      }
    >({
      query: ({ schoolId, assignmentId, ...body }) => ({
        url: `/school/${schoolId}/assignment/${assignmentId}/skill`,
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
  useUpdateClassAssignmentMutation,
  useUpdateLessonAssignmentMutation,
  useUpdateTaskAssignmentMutation,
  useCreateAssignmentMutation,
  useUdpateStudentAssignmentMutation,
  useRemoveStudentAssignmentMutation,
  useUpdateCourseAssignmentMutation,
  useRemoveCourseAssignmentMutation,
  useUpdateSkillAssignmentMutation,
  useRemoveSkillAssignmentMutation,
  useDeleteAssignmentMutation,
  useUpdateAssignmentMutation,
} = extendedApi;
