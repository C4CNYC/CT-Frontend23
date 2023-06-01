/* eslint-disable @typescript-eslint/no-invalid-void-type */
import {
  BaseListResponseInterface,
  BaseResponseInterface,
} from "src/utils/baseResponce.interface";
import { managerApi } from ".";
import { IStudent } from "../interfaces/user.interface";

const extendetApi = managerApi.injectEndpoints({
  endpoints: (builder) => ({
    getMentors: builder.query<
      BaseListResponseInterface<IStudent & BaseResponseInterface>,
      { schoolId: string; classId: string }
    >({
      query: ({ schoolId, classId }) => ({
        url: `/school/${schoolId}/class/${classId}/mentor`,
        method: "GET",
      }),
      providesTags: ["Mentors"],
    }),
    updateMentor: builder.mutation<
      void,
      { schoolId: string; classId: string; userId: string }
    >({
      query: ({ schoolId, classId, ...body }) => ({
        url: `/school/${schoolId}/class/${classId}/mentor`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Mentors"],
    }),
    deleteMentor: builder.mutation<
      void,
      { schoolId: string; classId: string; userId: string }
    >({
      query: ({ schoolId, classId, ...body }) => ({
        url: `/school/${schoolId}/class/${classId}/mentor`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Mentors"],
    }),
  }),
  overrideExisting: false,
});
export const {
  useGetMentorsQuery,
  // -------------mutation-----------
  useUpdateMentorMutation,
  useDeleteMentorMutation,
} = extendetApi;
