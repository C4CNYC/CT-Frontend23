/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { BaseListResponseInterface, BaseResponseInterface } from "@utils";

import { managerApi } from ".";
import {
  IAssignmentFull,
  IAssignmentReduced,
  IAssignmetsSearchParams,
} from "../../interfaces/assignment.interface";

const extendedApi = managerApi.injectEndpoints({
  endpoints: (builder) => ({
    getAssignmentStudent: builder.query<
      IAssignmentFull & BaseResponseInterface,
      { assignmentId: string } & IAssignmetsSearchParams
    >({
      query: ({ assignmentId, ...params }) => ({
        url: `/student/assignment/${assignmentId}`,
        method: "GET",
        params,
      }),
      providesTags: ["Assignment"],
    }),
    getAssignmentListStudent: builder.query<
      BaseListResponseInterface<IAssignmentReduced & BaseResponseInterface>,
      { class_id: string }
    >({
      query: ({ ...params }) => ({
        url: "/student/assignment",
        method: "GET",
        params,
      }),
      providesTags: ["Assignments"],
    }),
    pinAssignment: builder.mutation<
      void,
      {
        assignmentId: string;
      }
    >({
      query: ({ assignmentId }) => ({
        url: `/student/assignment/${assignmentId}/pin`,
        method: "PATCH",
      }),
      invalidatesTags: ["Assignments", "Assignment"],
    }),
    unpinAssignment: builder.mutation<
      void,
      {
        assignmentId: string;
      }
    >({
      query: ({ assignmentId }) => ({
        url: `/student/assignment/${assignmentId}/unpin`,
        method: "PATCH",
      }),
      invalidatesTags: ["Assignments", "Assignment"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAssignmentListStudentQuery,
  useGetAssignmentStudentQuery,
  // -------------mutation-----------
  usePinAssignmentMutation,
  useUnpinAssignmentMutation,
} = extendedApi;
