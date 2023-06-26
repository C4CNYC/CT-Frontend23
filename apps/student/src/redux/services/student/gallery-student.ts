import {
  IGallery,
  IGallerySearchParams,
} from "src/redux/interfaces/gallary.interface";
import { studentApi } from ".";
import {
  BaseListResponseInterface,
  BaseResponseInterface,
} from "@ct-nx/utils";

const extendedApi = studentApi.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query<
      BaseListResponseInterface<IGallery & BaseResponseInterface>,
      IGallerySearchParams
    >({
      query: (params) => ({
        url: "/project",
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
        url: `/project/${id}`,
        method: "GET",
      }),
      providesTags: ["Projects"],
    }),
    postProject: builder.mutation<IGallery, IGallery>({
      query: ({ ...body }) => ({
        url: "/project",
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
        url: `/project/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "Projects" }],
    }),
    removeProject: builder.mutation<IGallery, { id: string }>({
      query: ({ id }) => ({
        url: `/project/${id}`,
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
  usePostProjectMutation,
} = extendedApi;
