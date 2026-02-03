import { useEffect, useState } from 'react'

import { DEFAULT_TENANT, Tenant } from '../redux/slices/tenant'

function getDomain() {
  if (typeof window === 'object') {
    let domain = window.location.hostname
    if (domain) {
      return domain === 'localhost' ? 'codetribe' : domain
    }
  }
  return 'codetribe'
}

async function fetchTenant(domain: string): Promise<Tenant> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tenant/${domain}`)
    const data = await res.json()
    if (data && !data.error) return data
  } catch (e) {
    // console.error('Failed to fetch tenant', e)
  }
  return DEFAULT_TENANT
}

export function useTenants() {
  const [tenant, setTenant] = useState<Tenant | undefined>(undefined)

  useEffect(() => {
    const domain = getDomain()

    let savedTenant: Tenant | null = null
    try {
      const json = localStorage.getItem('tenant')
      savedTenant = json ? JSON.parse(json) : null
    } catch {}

    if (savedTenant) {
      setTenant(savedTenant)
    }

    ;(async () => {
      const fetchedTenant = await fetchTenant(domain)

      if (!savedTenant) {
        setTenant(fetchedTenant)
        localStorage.setItem('tenant', JSON.stringify(fetchedTenant))
        return
      }

      if (!savedTenant.updatedAt || fetchedTenant.updatedAt !== savedTenant.updatedAt) {
        setTenant(fetchedTenant)
        localStorage.setItem('tenant', JSON.stringify(fetchedTenant))
      }
    })()
  }, [])

  return tenant
}
