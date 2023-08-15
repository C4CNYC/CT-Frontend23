import { BaseListResponseInterface, BaseResponseInterface } from "@utils";

import { managerApi } from ".";
import { ISkill, ISkillSearch } from "../interfaces/skill.interface";

const extendedApi = managerApi.injectEndpoints({
  endpoints: (builder) => ({
    getSkill: builder.query<
      BaseListResponseInterface<ISkill & BaseResponseInterface>,
      ISkillSearch
    >({
      query: (params) => ({
        url: "/manager/skill",
        method: "GET",
        params,
      }),
      providesTags: ["Skills"],
    }),
    createSkill: builder.mutation<ISkill, ISkill>({
      query: ({ ...body }) => ({
        url: "/manager/skill",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Skills" }],
    }),
    updateSkill: builder.mutation<
      ISkill & BaseResponseInterface,
      { id: string; name: string; description: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/manager/skill/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "Skills" }],
    }),
    removeSkill: builder.mutation<ISkill, { id: string }>({
      query: ({ id }) => ({
        url: `/manager/skill/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Skills" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetSkillQuery,
  useCreateSkillMutation,
  useRemoveSkillMutation,
  useUpdateSkillMutation,
} = extendedApi;
