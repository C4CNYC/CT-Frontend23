import { BaseListResponseInterface, BaseResponseInterface } from "@utils";

import { managerApi } from ".";
import {
  ITask,
  ITaskCreate,
  ITaskDelete,
  ITaskSearchParams,
} from "../interfaces/task.interface";

const extendedApi = managerApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<
      BaseListResponseInterface<ITask & BaseResponseInterface>,
      ITaskSearchParams
    >({
      query: (params) => ({
        url: "/manager/task",
        method: "GET",
        params,
      }),
      providesTags: ["Tasks"],
    }),
    updateTask: builder.mutation<
      ITask & BaseResponseInterface,
      { id: string; body: string; name: string; language: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/manager/task/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "Tasks" }],
    }),
    createTask: builder.mutation<
      ITaskCreate & BaseResponseInterface,
      ITaskCreate
    >({
      query: ({ ...body }) => ({
        url: "/manager/task",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Tasks" }],
    }),
    deleteTask: builder.mutation<
      ITaskDelete & BaseResponseInterface,
      ITaskDelete
    >({
      query: ({ id }) => ({
        url: `/manager/task/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Tasks" }],
    }),
  }),
  overrideExisting: false,
});
export const {
  useGetTasksQuery,
  // -------------mutation-----------
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} = extendedApi;
