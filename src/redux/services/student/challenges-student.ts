import { BaseResponseInterface } from "@utils";
import { IChallanges } from "src/redux/interfaces/challenges.interface";

import { studentApi } from ".";

const extendedApi = studentApi.injectEndpoints({
  endpoints: (builder) => ({
    getChallanges: builder.query<
      IChallanges & BaseResponseInterface,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/course/${id}/content`,
        method: "GET",
      }),
      providesTags: ["Challenges"],
    }),
  }),
});
export const { useGetChallangesQuery } = extendedApi;
