import { BaseResponseInterface } from '@/lib/utils/baseResponse.interface'

import { ISkill } from '../interfaces/skill.interface'

import { managerApi } from '.'

const extendedApi = managerApi.injectEndpoints({
  endpoints: (builder) => ({
    getLessonSkill: builder.query<Array<ISkill & BaseResponseInterface>, { id: string }>({
      query: ({ id }) => ({
        url: `/manager/lesson/${id}/skill`,
        method: 'GET',
      }),
      providesTags: ['LessonSkill'],
    }),
    updateLessonSkill: builder.mutation<void, { id: string; skill_id: string }>({
      query: ({ id, ...body }) => ({
        url: `/manager/lesson/${id}/skill`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [{ type: 'LessonSkill' }],
    }),
    removeLessonSkill: builder.mutation<void, { id: string; skill_id: string }>({
      query: ({ id, ...body }) => ({
        url: `/managerlesson/${id}/skill`,
        method: 'DELETE',
        body,
      }),
      invalidatesTags: [{ type: 'LessonSkill' }],
    }),
  }),
})

export const {
  useGetLessonSkillQuery,
  useUpdateLessonSkillMutation,
  useRemoveLessonSkillMutation,
} = extendedApi
