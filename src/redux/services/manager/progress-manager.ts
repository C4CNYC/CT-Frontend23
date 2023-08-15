/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { BaseListResponseInterface, BaseResponseInterface } from "@utils";

import { managerApi } from ".";
import { ILessonContent } from "../interfaces/courseUnits.interface";
import {
  IProgress,
  IProgressChalanges,
  IProgressContent,
  IProgressSearch,
} from "../interfaces/progress.interface";

const extendedApi = managerApi.injectEndpoints({
  endpoints: (builder) => ({
    getProgress: builder.query<
      BaseListResponseInterface<IProgress & BaseResponseInterface>,
      IProgressSearch & { id: string }
    >({
      query: ({ id }) => ({
        url: `/manager/course/${id}/progress`,
        method: "GET",
      }),
      keepUnusedDataFor: 0,
    }),
    getProgressContent: builder.query<IProgressChalanges, { id: string }>({
      query: ({ id }) => ({
        url: `/manager/course/${id}/progress/content`,
        method: "GET",
      }),
      transformResponse: (
        response: IProgressContent & BaseResponseInterface
      ): IProgressChalanges => {
        const data = response.units.reduce<IProgressChalanges>(
          (acc, curr) => [
            ...acc,
            {
              id: curr.id,
              name: curr.name,
              type: "module",
              chalanges: [],
              lessons: curr.lessons
                .map((lesson) => ({
                  id: lesson.id,
                  name: lesson.name,
                  type: "lesson",
                  chalanges:
                    lesson.contents.filter(
                      (content) => content.validations.length
                    ) || [],
                }))
                .filter((d) => d.chalanges.length),
            },
          ],
          []
        );
        return data
          .map((unit) => ({
            ...unit,
            chalanges: unit.lessons.reduce<
              Array<ILessonContent & BaseResponseInterface>
            >((acc, curr) => [...acc, ...curr.chalanges], []),
          }))
          .filter((d) => d.chalanges.length);
      },
      keepUnusedDataFor: 0,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetProgressQuery,
  useGetProgressContentQuery,
  // -------------mutation-----------
} = extendedApi;
