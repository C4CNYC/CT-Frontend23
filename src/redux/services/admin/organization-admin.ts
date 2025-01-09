import { BaseResponseInterface } from '@root/src/utils'

import { IAdministration, IAdministrationCreate } from '../interfaces/administration'
import { OrganizationRequest, OrganizationResponce } from '../interfaces/organization.interface'

import { adminApi } from '.'

const extendedApi = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrganization: builder.query<OrganizationResponce, void>({
      query: () => ({
        url: '/org',
        method: 'GET',
      }),
      providesTags: ['Organization'],
    }),
    createOrganization: builder.mutation<OrganizationResponce, OrganizationRequest>({
      query: (body) => ({
        url: '/org',
        method: 'POST',
        body,
      }),
    }),
    updateOrganization: builder.mutation<
      OrganizationResponce,
      {
        body: OrganizationRequest
      }
    >({
      query: (data) => ({
        url: '/org',
        method: 'PATCH',
        body: data.body,
      }),
      invalidatesTags: [{ type: 'Organization' }],
    }),
    updateOrgAvatar: builder.mutation<
      void,
      {
        file: FormData
      }
    >({
      query: ({ file }) => ({
        url: '/org/avatar',
        method: 'PATCH',
        headers: {
          // "Content-Type": "multipart/form-data",
        },
        body: file,
      }),
      invalidatesTags: [{ type: 'Organization' }],
    }),
    updateOrgCover: builder.mutation<
      void,
      {
        file: FormData
      }
    >({
      query: ({ file }) => ({
        url: '/org/cover',
        method: 'PATCH',
        body: file,
      }),
      invalidatesTags: [{ type: 'Organization' }],
    }),

    getOwnerOrg: builder.query<IAdministration & BaseResponseInterface, void>({
      query: () => ({
        url: `/org`,
        method: 'GET',
      }),
      providesTags: ['AdministrationOwner'],
    }),
    updateOwnerOrg: builder.mutation<
      IAdministration & BaseResponseInterface,
      { id: string } & Partial<IAdministrationCreate>
    >({
      query: ({ id, ...body }) => ({
        url: `/org/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['AdministrationOwner'],
    }),
    updateOwnerOrgFavicon: builder.mutation<
      IAdministration & BaseResponseInterface,
      { id: string; file: FormData }
    >({
      query: ({ id, file }) => ({
        url: `/org/${id}/favicon`,
        method: 'PATCH',
        body: file,
      }),
      invalidatesTags: ['AdministrationOwner'],
    }),
    updateOwnerOrgLogoMini: builder.mutation<
      IAdministration & BaseResponseInterface,
      { id: string; file: FormData }
    >({
      query: ({ id, file }) => ({
        url: `/org/${id}/mini-logo`,
        method: 'PATCH',
        body: file,
      }),
      invalidatesTags: ['AdministrationOwner'],
    }),
    updateOwnerOrgLogo: builder.mutation<
      IAdministration & BaseResponseInterface,
      { id: string; file: FormData }
    >({
      query: ({ id, file }) => ({
        url: `/org/${id}/logo`,
        method: 'PATCH',
        body: file,
      }),
      invalidatesTags: ['AdministrationOwner'],
    }),
  }),
})

export const {
  useGetOrganizationQuery,
  useCreateOrganizationMutation,
  useUpdateOrganizationMutation,
  useUpdateOrgAvatarMutation,
  useUpdateOrgCoverMutation,

  //owner
  useGetOwnerOrgQuery,
  useUpdateOwnerOrgMutation,
  useUpdateOwnerOrgLogoMutation,
  useUpdateOwnerOrgFaviconMutation,
  useUpdateOwnerOrgLogoMiniMutation,
} = extendedApi
