import { DEFAULT_TENANT } from '@/redux/slices/tenant'

export async function getTenantByDomain(domain: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tenant/${domain}`)
    const data = await res.json()

    if (data && !data.error) return data
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error loading tenant:', err)
  }

  return DEFAULT_TENANT
}
