import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWrapper } from './helpers/base_query_wrapper'

export const feedbackApi = createApi({
  reducerPath: 'feedback',
  baseQuery: baseQueryWrapper(`${process.env.NEXT_PUBLIC_API_URL}`),
  tagTypes: ['ProfileUser'],
  endpoints: (builder) => ({
    sendGeneralFeedback: builder.mutation({
      query: (body) => ({
        url: '/feedback/general',
        method: 'POST',
        body,
      }),
    }),
    sendTrainingFeedback: builder.mutation({
      query: (body) => ({
        url: '/feedback/training',
        method: 'POST',
        body,
      }),
    }),
    sendSlideFeedback: builder.mutation({
      query: (body) => ({
        url: '/feedback/slide',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const {
  useSendGeneralFeedbackMutation,
  useSendTrainingFeedbackMutation,
  useSendSlideFeedbackMutation,
} = feedbackApi
