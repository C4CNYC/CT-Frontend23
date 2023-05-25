import { BaseResponseInterface } from "src/utils/baseResponce.interface";
import { managerApi } from ".";
import { IStream } from "../interfaces/stream.interface";

const extendedApi = managerApi.injectEndpoints({
  endpoints: (builder) => ({
    createStream: builder.mutation<
      IStream & BaseResponseInterface,
      // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
      void
    >({
      query: () => ({
        url: "/stream",
        method: "POST",
      }),
      invalidatesTags: [{ type: "Streams" }],
    }),
    updateStream: builder.mutation<
      IStream & BaseResponseInterface,
      { id: string; name: string; description: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/stream/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "Streams" }],
    }),
    removeStream: builder.mutation<IStream, { id: string }>({
      query: ({ id }) => ({
        url: `/stream/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Streams" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateStreamMutation,
  useRemoveStreamMutation,
  useUpdateStreamMutation,
} = extendedApi;
