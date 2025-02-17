import {
  ILesson,
  ILessonContent,
  ILessonSearchParams,
  LastVisitedBody,
  LastVisitedData,
  ILastVisitedSlide,
  ILastVisitedSlideBody,
} from '@/redux/interfaces/content.interface'
import { ContentValidation, setContentValidations } from '@/redux/slices/code-panel-global'
import { BaseListResponseInterface, BaseResponseInterface } from '@/utils'

import { managerApi } from '.'

const extendedApi = managerApi.injectEndpoints({
  endpoints: (builder) => ({
    getLessonContentStudent: builder.query<
      Array<ILessonContent & BaseResponseInterface>,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/student/lesson/${id}/content`,
        method: 'GET',
      }),
      keepUnusedDataFor: 0,
      transformResponse: (res: Array<ILessonContent & BaseResponseInterface>) =>
        res.sort((a, b) => a.meta.order - b.meta.order),
      async onQueryStarted(id, { dispatch, queryFulfilled, getState }) {
        try {
          const { data } = await queryFulfilled
          const mutatedData = data
            .filter((item) => item.validations.length)
            .map((item) => ({ contentId: item.id, checkers: undefined }))
          dispatch(setContentValidations(mutatedData))
        } catch (err) {}
      },
    }),
    getContentCheckers: builder.query<
      BaseResponseInterface & { completed_chalanges: ILessonContent[] },
      undefined
    >({
      query: () => ({
        url: `/student/progress/get-complete-chalange`,
        method: 'GET',
      }),
      keepUnusedDataFor: 0,
      async onQueryStarted(id, { dispatch, queryFulfilled, getState }) {
        try {
          const { data } = await queryFulfilled
          const { completed_chalanges } = data
          let result
          const contentValidations = getState() as any
          result = completed_chalanges
            .reduce(
              (acc, c) =>
                acc.map((content: ContentValidation) => ({
                  ...content,
                  checkers:
                    content.contentId === c.id
                      ? [...c.validations]
                          .sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
                          .map((val) => ({
                            text: val.name,
                            valid: true,
                          }))
                      : content.checkers || [],
                })),
              contentValidations?.codePanelGlobal?.contentValidations
            )
            .map((item: any) => (item.checkers ? item : { ...item, checkers: [] }))
          dispatch(setContentValidations(result))
        } catch (err) {}
      },
    }),
    getLessonStudent: builder.query<ILesson & BaseResponseInterface, { id: string }>({
      query: ({ id }) => ({
        url: `/student/lesson/${id}`,
        method: 'GET',
      }),
      keepUnusedDataFor: 0,
    }),
    getLessonsListStudent: builder.query<
      BaseListResponseInterface<ILesson & BaseResponseInterface>,
      ILessonSearchParams
    >({
      query: (params) => ({
        url: '/student/content/lesson',
        method: 'GET',
        params,
      }),
      keepUnusedDataFor: 0,
      providesTags: ['Lessons'],
    }),

    getStudentLastVisitedUnitAndLesson: builder.query<LastVisitedData, void>({
      query: () => ({
        url: '/student/lesson/last-visited',
        method: 'GET',
      }),
      providesTags: ['LastVisitedUnitAndLesson'],
    }),
    getStudentLastVisitedSlide: builder.query<
      ILastVisitedSlide & BaseResponseInterface,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `student/lesson/last-slide/${id}`,
        method: 'GET',
      }),
      keepUnusedDataFor: 0,
      providesTags: ['LastVisitedLessonSlide'],
    }),
    updateStudentLastVisitedSlide: builder.mutation<void, ILastVisitedSlideBody>({
      query: ({ ...body }) => ({
        url: 'student/lesson/last-slide',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['LastVisitedLessonSlide'],
    }),
    updateStudentLastVisitedData: builder.mutation<void, LastVisitedBody>({
      query: ({ ...body }) => ({
        url: '/student/lesson/last-visited',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['LastVisitedUnitAndLesson'],
    }),
  }),

  overrideExisting: false,
})

export const {
  useGetLessonContentStudentQuery,
  useGetLessonStudentQuery,
  useGetLessonsListStudentQuery,
  useGetStudentLastVisitedUnitAndLessonQuery,
  useGetContentCheckersQuery,
  useGetStudentLastVisitedSlideQuery,
  // -------------mutation-----------
  useUpdateStudentLastVisitedDataMutation,
  useUpdateStudentLastVisitedSlideMutation,
} = extendedApi
