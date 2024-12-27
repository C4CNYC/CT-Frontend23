import { accessControlApi } from '@root/src/redux/services/public/access-control-public'

export function useSelfAccess(feature: string) {
  const { useGetSelfAccessQuery } = accessControlApi
  const { data: selfAccess } = useGetSelfAccessQuery()
  return selfAccess?.find((item) => item.feature === feature)?.maxUsageCount || 0
}
