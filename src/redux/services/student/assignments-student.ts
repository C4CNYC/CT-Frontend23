/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { BaseListResponseInterface, BaseResponseInterface } from "@utils";

import { studentApi } from ".";
import { IAssignment } from "../interfaces/assignment.interface";

const extendedApi = studentApi.injectEndpoints({
  endpoints: (builder) => ({
    getAssignment: builder.query<
      IAssignment & BaseResponseInterface,
      { assignmentId: string }
    >({
      query: ({ assignmentId }) => ({
        url: `/assignment/${assignmentId}`,
        method: "GET",
      }),
      providesTags: ["Assignment"],
    }),
    getAssignmentList: builder.query<
      BaseListResponseInterface<IAssignment & BaseResponseInterface>,
      void
    >({
      query: () => ({
        url: "/assignment",
        method: "GET",
      }),
      providesTags: ["Assignments"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAssignmentListQuery,
  useGetAssignmentQuery,
  // -------------mutation-----------
} = extendedApi;
