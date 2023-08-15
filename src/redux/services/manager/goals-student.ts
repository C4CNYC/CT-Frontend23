import { BaseListResponseInterface, BaseResponseInterface } from "@utils";
import { IGoals } from "src/redux/interfaces/goals.interface";

import { managerApi } from ".";

const extendedApi = managerApi.injectEndpoints({
  endpoints: (builder) => ({
    getGoals: builder.query<
      BaseListResponseInterface<IGoals & BaseResponseInterface>,
      { title?: string }
    >({
      query: () => ({
        url: "/student/goal",
        method: "GET",
      }),
      providesTags: ["Goal"],
    }),
    postGoal: builder.mutation<IGoals, IGoals>({
      query: ({ ...body }) => ({
        url: "/student/goal",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Goal" }],
    }),
    updateGoal: builder.mutation<
      IGoals & BaseResponseInterface,
      { id: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/student/goal/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "Goal" }],
    }),
    removeGoal: builder.mutation<IGoals, { id: string }>({
      query: ({ id }) => ({
        url: `/student/goal/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Goal" }],
    }),
  }),
});

export const {
  useGetGoalsQuery,
  // ------------------
  usePostGoalMutation,
  useUpdateGoalMutation,
  useRemoveGoalMutation,
} = extendedApi;
