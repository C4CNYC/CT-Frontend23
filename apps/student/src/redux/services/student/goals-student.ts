import { IGoals } from "src/redux/interfaces/goals.interface";
import { studentApi } from ".";
import {
  BaseListResponseInterface,
  BaseResponseInterface,
} from "@ct-nx/utils";

const extendedApi = studentApi.injectEndpoints({
  endpoints: (builder) => ({
    getGoals: builder.query<
      BaseListResponseInterface<IGoals & BaseResponseInterface>,
      { title?: string }
    >({
      query: () => ({
        url: "/goal",
        method: "GET",
      }),
      providesTags: ["Goal"],
    }),
    postGoal: builder.mutation<IGoals, IGoals>({
      query: ({ ...body }) => ({
        url: "/goal",
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
        url: `/goal/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "Goal" }],
    }),
    removeGoal: builder.mutation<IGoals, { id: string }>({
      query: ({ id }) => ({
        url: `/goal/${id}`,
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
