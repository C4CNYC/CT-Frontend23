import { BaseResponseInterface } from '@/utils'

import { StudentFile } from '../interfaces/workspace.interface'

import { managerApi } from '.'

const extendedApi = managerApi.injectEndpoints({
  endpoints: (builder) => ({
    getStudentFiles: builder.query<
      Array<StudentFile & BaseResponseInterface>,
      { contentId: string; prevContentId?: string }
    >({
      query: ({ contentId, prevContentId }) => ({
        url: '/student/workspace',
        method: 'GET',
        params: {
          lessonContentId: contentId,
          previousLessonContentId: prevContentId ?? '',
        },
      }),
      keepUnusedDataFor: 0,
      providesTags: ['WorkspaceStudent'],
    }),
    createStudentFile: builder.mutation<StudentFile, StudentFile>({
      query: ({ ...body }) => ({
        url: `/student/workspace/file`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'WorkspaceStudent' }],
    }),
    updateStudentFile: builder.mutation<
      StudentFile & BaseResponseInterface,
      { id: string; body?: string; name?: string; extension?: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/student/workspace/file/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [{ type: 'WorkspaceStudent' }],
    }),
    deleteStudentFile: builder.mutation<StudentFile & BaseResponseInterface, { id: string }>({
      query: ({ id }) => ({
        url: `/student/workspace/file/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'WorkspaceStudent' }],
    }),
  }),
  overrideExisting: false,
})
export const {
  useGetStudentFilesQuery,
  // -------------mutation-----------
  useCreateStudentFileMutation,
  useUpdateStudentFileMutation,
  useDeleteStudentFileMutation,
} = extendedApi
