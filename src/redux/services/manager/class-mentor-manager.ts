import { BaseResponseInterface } from "src/utils/baseResponce.interface";
import { managerApi } from ".";
import { IMentor, MentorSearchParams } from "../interfaces/user.interface";

const extendetApi = managerApi.injectEndpoints({
  endpoints: (builder) => ({
    getMentors: builder.query<
      IMentor & BaseResponseInterface,
      { school_id: string; class_id: string } & MentorSearchParams
    >({
      query: ({ school_id, class_id, ...params }) => ({
        url: `/school/${school_id}/class/${class_id}/mentor`,
        method: "GET",
        params,
      }),
      providesTags: ["Mentor"],
    }),
    updateMentor: builder.mutation<
      void,
      { school_id: string; class_id: string; student_id: string }
    >({
      query: ({ school_id, class_id, ...body }) => ({
        url: `/school/${school_id}/class/${class_id}/mentor`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Mentor"],
    }),
    deleteMentor: builder.mutation<
      void,
      { school_id: string; class_id: string; student_id: string }
    >({
      query: ({ school_id, class_id }) => ({
        url: `/school/${school_id}/class/${class_id}/mentor`,
        method: "DELETE",
      }),
      invalidatesTags: ["Mentor"],
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
