import {
  InviteInfoResponse,
  AcceptInviteRequest,
  AcceptInviteResponse,
  CreateInviteTeacherToSchoolRequest,
  CreateInviteResponse,
} from '../interfaces/inviteSystem.interface'

import { managerApi } from '.'

const extendedApi = managerApi.injectEndpoints({
  endpoints: (builder) => ({
    getInvite: builder.query<InviteInfoResponse, string>({
      query: (code) => ({
        url: `invite-v2?code=${code}`,
        method: 'GET',
      }),
      keepUnusedDataFor: 0,
    }),

    acceptInvite: builder.mutation<AcceptInviteResponse, AcceptInviteRequest>({
      query: (body) => ({
        url: `invite-v2/accept`,
        method: 'POST',
        body,
      }),
    }),

    createInviteTeacherToSchool: builder.mutation<
      CreateInviteResponse,
      CreateInviteTeacherToSchoolRequest
    >({
      query: (body) => ({
        url: `invite-v2/create-invite-teacher-to-school`,
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const {
  useGetInviteQuery,
  useAcceptInviteMutation,
  useCreateInviteTeacherToSchoolMutation,
} = extendedApi
