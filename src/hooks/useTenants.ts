import { useEffect, useState } from 'react'

import { DEFAULT_TENANT, Tenant } from '../redux/slices/tenant'

let fetched = false

async function fetchTenant(domain: string, setTenant: (tenant: Tenant) => void) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tenant/${domain}`)
    const data = await res.json()
    setTenant(data)
    localStorage.setItem('tenantName', data.name)
  } catch (error) {
    setTenant(DEFAULT_TENANT)
    localStorage.setItem('tenantName', DEFAULT_TENANT.name)
  }
}
function getDomain() {
  if (typeof window === 'object') {
    let subdomain = window.location.hostname

    if (subdomain) {
      return subdomain === 'localhost' ? 'codejika' : subdomain
    }
  }

  return 'codejika'
}

export function useTenants() {
  const [tenant, setTenant] = useState<Tenant>()
  useEffect(() => {
    if (fetched) return
    fetched = true

    let domain = getDomain()
    fetchTenant(domain, setTenant)
  }, [])

  return tenant
}
