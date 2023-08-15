import { BaseResponseInterface } from "@utils";
import { ISocials } from "src/redux/interfaces/socials.interface";

import { managerApi } from ".";

const extendedApi = managerApi.injectEndpoints({
  endpoints: (builder) => ({
    getSocials: builder.query<ISocials[], { studentId: string }>({
      query: ({ studentId }) => ({
        url: `/student/${studentId}/social`,
        method: "GET",
      }),
      providesTags: ["Socials"],
    }),
    postSocial: builder.mutation<
      ISocials,
      { studentId: string; link: string; name: string; type: string }
    >({
      query: ({ studentId, ...body }) => ({
        url: `/student/${studentId}/social`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Socials"],
    }),
    updateSocials: builder.mutation<
      ISocials & BaseResponseInterface,
      {
        studentId: string;
        socialId: string;
      }
    >({
      query: ({ studentId, socialId, ...body }) => ({
        url: `/student/${studentId}/social/${socialId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Socials"],
    }),
    removeSocials: builder.mutation<
      ISocials,
      { studentId: string; socialId: string }
    >({
      query: ({ studentId, socialId }) => ({
        url: `/student/${studentId}/social/${socialId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Socials"],
    }),
  }),
});

export const {
  useGetSocialsQuery,
  // --------------------------
  usePostSocialMutation,
  useUpdateSocialsMutation,
  useRemoveSocialsMutation,
} = extendedApi;
