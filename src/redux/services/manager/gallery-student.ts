import { BaseListResponseInterface, BaseResponseInterface } from "@utils";
import {
  IGallery,
  IGallerySearchParams,
} from "src/redux/interfaces/gallary.interface";

import { managerApi } from ".";

const extendedApi = managerApi.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query<
      BaseListResponseInterface<IGallery & BaseResponseInterface>,
      IGallerySearchParams
    >({
      query: (params) => ({
        url: "/student/project",
        method: "GET",
        params,
      }),
      providesTags: ["Projects"],
    }),
    getProjectById: builder.query<
      IGallery & BaseResponseInterface,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/student/project/${id}`,
        method: "GET",
      }),
      providesTags: ["Projects"],
    }),
    postProject: builder.mutation<IGallery, IGallery>({
      query: ({ ...body }) => ({
        url: "/student/project",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Projects" }],
    }),
    updateProject: builder.mutation<
      IGallery & BaseResponseInterface,
      { id: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/student/project/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "Projects" }],
    }),
    updateProjectCover: builder.mutation<
      IGallery,
      { id: string; file: FormData }
    >({
      query: ({ id, file }) => ({
        url: `/student/project/${id}/cover`,
        method: "PATCH",
        body: file,
      }),
    }),
    removeProject: builder.mutation<IGallery, { id: string }>({
      query: ({ id }) => ({
        url: `/student/project/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Projects" }],
    }),
  }),
});

export const {
  useGetProjectByIdQuery,
  useGetProjectsQuery,
  // -------------mutation-----------
  useUpdateProjectMutation,
  useRemoveProjectMutation,
  useUpdateProjectCoverMutation,
  usePostProjectMutation,
} = extendedApi;
