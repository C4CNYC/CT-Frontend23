import { managerApi } from '.'

const extendedApi = managerApi.injectEndpoints({
  endpoints: (builder) => ({
    getLastActiveTribe: builder.query<{ lastActiveTribe: string | null }, void>({
      query: () => ({
        url: 'student/activity',
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
  }),
})

export const {
  useGetLastActiveTribeQuery,
  // ------------------
  useSetLastActiveTribeMutation,
} = extendedApi
