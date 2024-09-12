export const getTenantFromSubdomain = () => {
  const subdomain = window.location.hostname.split('.')[0]
  return subdomain.toLowerCase() || 'codetribe'
}
