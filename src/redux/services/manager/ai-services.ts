import { BaseResponseInterface } from '@/utils'

import { N8NRequest } from '../interfaces/ai.interface'
import { IOpenAiRequest } from '../interfaces/courseUnits.interface'

import { managerApi } from '.'

const extendedApi = managerApi.injectEndpoints({
  endpoints: (builder) => ({
    n8nRequest: builder.mutation<IOpenAiRequest & BaseResponseInterface, N8NRequest>({
      query: (body) => ({
        url: '/manager/lesson/n8nRequest',
        method: 'POST',
        body,
      }),
    }),
  }),
})
export const { useN8nRequestMutation } = extendedApi

export function useN8nRequest() {
  const [ask] = useN8nRequestMutation()
  return (prompt: string, endPointPath: string) => ask({ prompt, endPointPath })
}
