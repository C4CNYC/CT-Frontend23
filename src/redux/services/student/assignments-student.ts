/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { BaseListResponseInterface, BaseResponseInterface } from "@utils";
import { IAssignment } from "src/redux/interfaces/assignment.interface";

import { studentApi } from ".";

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
