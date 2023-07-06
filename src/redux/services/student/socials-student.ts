import { ISocials } from "src/redux/interfaces/socials.interface";
import { studentApi } from ".";
import { BaseResponseInterface } from "@utils";

const extendedApi = studentApi.injectEndpoints({
  endpoints: (builder) => ({
    getSocials: builder.query<ISocials[], { studentId: string }>({
      query: ({ studentId }) => ({
        url: `/${studentId}/social`,
        method: "GET",
      }),
      providesTags: ["Socials"],
    }),
    postSocial: builder.mutation<
      ISocials,
      { studentId: string; link: string; name: string; type: string }
    >({
      query: ({ studentId, ...body }) => ({
        url: `/${studentId}/social`,
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
        url: `/${studentId}/social/${socialId}`,
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
        url: `/${studentId}/social/${socialId}`,
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
