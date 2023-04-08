import { BaseResponseInterface } from "src/utils/baseResponce.interface";
import { managerApi } from ".";

const extendedApi = managerApi.injectEndpoints({
  endpoints: (builder) => ({
    getLessonSkill: builder.query<BaseResponseInterface, {id: string}>(
      {
        query: ({ id}) => ({
          url: `/lesson/${id}/skill`,
          method: "GET",
        }),
        providesTags: ["LessonSkill"],
      }
    ),
    updateLessonSkill: builder.mutation<
      BaseResponseInterface,
      { id: string } & BaseResponseInterface
    >({
      query: ({ id, ...body }) => ({
        url: `lesson/${id}/skill`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "LessonSkill" }],
    }),
    removeLessonSkill: builder.mutation<BaseResponseInterface, { id: string }>({
      query: ({ id }) => ({
        url: `lesson/${id}/skill`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "LessonSkill" }],
    }),
  }),
});

export const {
  useGetLessonSkillQuery,
  useUpdateLessonSkillMutation,
  useRemoveLessonSkillMutation,
} = extendedApi;
