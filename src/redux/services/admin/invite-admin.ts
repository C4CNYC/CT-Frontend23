import { BaseResponseInterface } from "@utils";

import { adminApi } from ".";
import {
  ISendInvite,
  ISubmitInvite,
} from "../interfaces/organization.interface";

const extendedApi = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    inviteSubmit: builder.mutation<
      ISubmitInvite & BaseResponseInterface,
      ISubmitInvite
    >({
      query: ({ ...body }) => ({
        url: "/org/user/submitInvite",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Organization" }],
    }),
    sendInvite: builder.mutation<
      ISendInvite & BaseResponseInterface,
      ISendInvite
    >({
      query: ({ ...body }) => ({
        url: "/org/user/invite",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Teachers" }],
    }),
  }),
});

export const { useInviteSubmitMutation, useSendInviteMutation } = extendedApi;
