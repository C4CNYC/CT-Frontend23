import { BaseResponseInterface } from "@utils";
import { IChallanges } from "src/redux/interfaces/challenges.interface";

import { managerApi } from ".";

const extendedApi = managerApi.injectEndpoints({
  endpoints: (builder) => ({
    getChallanges: builder.query<
      IChallanges & BaseResponseInterface,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/student/course/${id}/content`,
        method: "GET",
      }),
      providesTags: ["Challenges"],
    }),
  }),
});
export const { useGetChallangesQuery } = extendedApi;
