import { managerApi } from '.'

const extendedApi = managerApi.injectEndpoints({
  endpoints: (builder) => ({
    UserRegisteredStats: builder.query<any, {}>({
      query: ({}) => ({
        url: `/stats/UserRegisteredStats?nDays=30`,
        method: 'GET',
      }),
      providesTags: ['Stats'],
    }),
    UserRegisteredStatsByOrg: builder.query<any, { nDays: number }>({
      query: ({ nDays }: { nDays: number }) => ({
        url: `/stats/UserRegisteredStatsByOrg?nDays=${nDays}`,
        method: 'GET',
      }),
      providesTags: ['Stats'],
    }),
    LessonCreatedStats: builder.query<any, {}>({
      query: ({}) => ({
        url: `/stats/LessonCreatedStats?nDays=30`,
        method: 'GET',
      }),
      providesTags: ['Stats'],
    }),
    CourseProgressStats: builder.query<any, {}>({
      query: ({}) => ({
        url: `/stats/CourseProgressStats?nDays=30`,
        method: 'GET',
      }),
      providesTags: ['Stats'],
    }),
    logActivityStats: builder.query<any, {}>({
      query: ({}) => ({
        url: `/stats/logActivityStats?nDays=30`,
        method: 'GET',
      }),
      providesTags: ['Stats'],
    }),
    logActivityLast: builder.query<any, {}>({
      query: ({}) => ({
        url: `/stats/logActivityLast?nDays=30`,
        method: 'GET',
      }),
      providesTags: ['Stats'],
    }),
  }),
})
export const {
  useUserRegisteredStatsQuery,
  useUserRegisteredStatsByOrgQuery,
  useLessonCreatedStatsQuery,
  useCourseProgressStatsQuery,
  useLogActivityStatsQuery,
  useLogActivityLastQuery,
} = extendedApi
