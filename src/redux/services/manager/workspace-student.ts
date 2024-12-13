import { BaseResponseInterface } from '@/utils'

import { StudentFile } from '../interfaces/workspace.interface'

import { managerApi } from '.'

const extendedApi = managerApi.injectEndpoints({
  endpoints: (builder) => ({
    getStudentFiles: builder.query<
      Array<StudentFile & BaseResponseInterface>,
      { lessonId: string; lessonContentId?: string }
    >({
      query: ({ lessonId, lessonContentId }) => ({
        url: '/student/workspace',
        method: 'GET',
        params: {
          lessonId,
          lessonContentId: lessonContentId,
        },
      }),
      keepUnusedDataFor: 0,
      providesTags: ['WorkspaceStudent'],
    }),
    getFilesByUnauthUser: builder.query<
      StudentFile[],
      { lessonId: string; lessonContentId?: string }
    >({
      query: ({ lessonId, lessonContentId }) => ({
        url: '/public/workspace',
        method: 'GET',
        params: {
          lessonId,
          lessonContentId,
        },
      }),
      keepUnusedDataFor: 0,
    }),
    createStudentFile: builder.mutation<StudentFile, Omit<StudentFile, 'id'>>({
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
    }),
    lessonFilesCarryOver: builder.mutation<void, { lessonId: string; prevLessonId: string }>({
      query: (body) => ({
        url: `/student/workspace/file/carry-over`,
        method: 'POST',
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
  useGetFilesByUnauthUserQuery,
  // -------------mutation-----------
  useCreateStudentFileMutation,
  useUpdateStudentFileMutation,
  useDeleteStudentFileMutation,
  useLessonFilesCarryOverMutation,
} = extendedApi
