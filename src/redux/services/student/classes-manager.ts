/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { BaseListResponseInterface, BaseResponseInterface } from "@utils";
import {
  ClassSearchParams,
  IClass,
  IMentor,
} from "src/redux/interfaces/class.interface";

import { studentApi } from ".";

const extendedApi = studentApi.injectEndpoints({
  endpoints: (builder) => ({
    createClass: builder.mutation<void, IClass>({
      query: ({ ...body }) => ({
        url: "/class",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Classes"],
    }),
    joinClass: builder.mutation<
      { status: "joined"; tribe: IClass & BaseResponseInterface },
      { share_token: string }
    >({
      query: ({ ...body }) => ({
        url: "/class/join",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Classes"],
    }),
    getClasses: builder.query<
      BaseListResponseInterface<IClass & BaseResponseInterface>,
      ClassSearchParams
    >({
      query: ({ ...params }) => ({
        url: "/class",
        method: "GET",
        params,
      }),
      keepUnusedDataFor: 0,
      providesTags: ["Classes"],
    }),
    getClass: builder.query<IClass & BaseResponseInterface, { id: string }>({
      query: ({ id }) => ({
        url: `/class/${id}`,
        method: "GET",
      }),
      providesTags: ["Classes"],
    }),
    getClassMentor: builder.query<IMentor[], { id: string }>({
      query: ({ id }) => ({
        url: `/class/${id}/mentor`,
        method: "GET",
      }),
      transformResponse: (response: IMentor[]) => {
        const manager = response.filter((el) => el.role === "manager");
        return manager ?? response;
      },
      providesTags: ["Classes"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetClassesQuery,
  useGetClassQuery,
  useGetClassMentorQuery,
  // -------------mutation-----------
  useJoinClassMutation,
  useCreateClassMutation,
} = extendedApi;
