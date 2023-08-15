import { BaseResponseInterface } from "@utils";

import { managerApi } from ".";
import { ISkill } from "../interfaces/skill.interface";

const extendedApi = managerApi.injectEndpoints({
  endpoints: (builder) => ({
    getLessonSkill: builder.query<
      Array<ISkill & BaseResponseInterface>,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/manager/lesson/${id}/skill`,
        method: "GET",
      }),
      providesTags: ["LessonSkill"],
    }),
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    updateLessonSkill: builder.mutation<void, { id: string; skill_id: string }>(
      {
        query: ({ id, ...body }) => ({
          url: `/manager/lesson/${id}/skill`,
          method: "PATCH",
          body,
        }),
        invalidatesTags: [{ type: "LessonSkill" }],
      }
    ),
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    removeLessonSkill: builder.mutation<void, { id: string; skill_id: string }>(
      {
        query: ({ id, ...body }) => ({
          url: `/managerlesson/${id}/skill`,
          method: "DELETE",
          body,
        }),
        invalidatesTags: [{ type: "LessonSkill" }],
      }
    ),
  }),
});

export const {
  useGetLessonSkillQuery,
  useUpdateLessonSkillMutation,
  useRemoveLessonSkillMutation,
} = extendedApi;
