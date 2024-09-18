import { useGetTenantConfigurationQuery } from '../redux/services/tenant-configs'
import { getTenantFromSubdomain } from '../utils/getTenantFromSubdomain'

export const useTenantConfig = () => {
  const tenantName = getTenantFromSubdomain()
  const { data, isLoading, isFetching } = useGetTenantConfigurationQuery({ tenantName })
  return {
    data: data || null,
    isLoading: isLoading || isFetching,
  }
}
