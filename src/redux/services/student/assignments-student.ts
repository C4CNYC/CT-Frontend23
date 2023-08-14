/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { BaseListResponseInterface, BaseResponseInterface } from "@utils";

import { studentApi } from ".";
import {
  IAssignment,
  IAssignmetsSearchParams,
} from "../../interfaces/assignment.interface";

const extendedApi = studentApi.injectEndpoints({
  endpoints: (builder) => ({
    getAssignmentStudent: builder.query<
      IAssignment & BaseResponseInterface,
      { assignmentId: string } & IAssignmetsSearchParams
    >({
      query: ({ assignmentId, ...params }) => ({
        url: `/assignment/${assignmentId}`,
        method: "GET",
        params,
      }),
      providesTags: ["Assignment"],
    }),
    getAssignmentListStudent: builder.query<
      BaseListResponseInterface<IAssignment & BaseResponseInterface>,
      { class_id: string }
    >({
      query: ({ ...params }) => ({
        url: "/assignment",
        method: "GET",
        params,
      }),
      providesTags: ["Assignments"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAssignmentListStudentQuery,
  useGetAssignmentStudentQuery,
  // -------------mutation-----------
} = extendedApi;
