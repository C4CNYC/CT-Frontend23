import {
  BaseListResponseInterface,
  BaseResponseInterface,
} from "src/utils/baseResponce.interface";
import { managerApi } from ".";
import {
  IMentor,
  IStudent,
  MentorSearchParams,
} from "../interfaces/user.interface";

const extendetApi = managerApi.injectEndpoints({
  endpoints: (builder) => ({
    getMentors: builder.query<
      BaseListResponseInterface<IStudent & BaseResponseInterface>,
      { school_id: string; class_id: string }
    >({
      query: ({ school_id, class_id }) => ({
        url: `/school/${school_id}/class/${class_id}/mentor`,
        method: "GET",
      }),
      providesTags: ["Mentors"],
    }),
    updateMentor: builder.mutation<
      void,
      { school_id: string; class_id: string; user_id: string }
    >({
      query: ({ school_id, class_id, ...body }) => ({
        url: `/school/${school_id}/class/${class_id}/mentor`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Mentors"],
    }),
    deleteMentor: builder.mutation<
      void,
      { school_id: string; class_id: string; user_id: string }
    >({
      query: ({ school_id, class_id, ...body }) => ({
        url: `/school/${school_id}/class/${class_id}/mentor`,
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
