import { managerApi } from '.'

const extendedApi = managerApi.injectEndpoints({
  endpoints: (builder) => ({
    getLastActiveTribe: builder.query<{ lastActiveTribe: string | null }, void>({
      query: () => ({
        url: 'student/activity',
        method: 'GET',
      }),
    }),
    getLastWorkspace: builder.query<{ lastWorkspaceQuery: string | null }, void>({
      query: () => ({
        url: 'student/activity/workspace-query',
        method: 'GET',
      }),
    }),
    setLastActiveTribe: builder.mutation<void, { class_id: string }>({
      query: (body) => ({
        url: `student/activity`,
        method: 'POST',
        body,
      }),
    }),
    setLastWorkspaceQuery: builder.mutation<void, { query: string }>({
      query: (body) => ({
        url: `student/activity/workspace-query`,
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const {
  useGetLastWorkspaceQuery,
  useGetLastActiveTribeQuery,
  // ------------------
  useSetLastActiveTribeMutation,
  useSetLastWorkspaceQueryMutation,
} = extendedApi
