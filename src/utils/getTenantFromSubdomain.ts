export const getTenantFromSubdomain = () => {
  const subdomain = (typeof window === 'object' && window?.location?.hostname?.split('.')[0]) || ''
  return subdomain.toLowerCase() || 'codetribe'
}
