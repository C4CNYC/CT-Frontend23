export function getPrimaryDomainWithHttps(domains: string): string | null {
  if (!domains || typeof domains !== 'string') return null

  const parts = domains
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean)

  const firstDomain = parts[0]

  if (!firstDomain) return null

  return firstDomain.startsWith('http') ? firstDomain : `https://${firstDomain}`
}
