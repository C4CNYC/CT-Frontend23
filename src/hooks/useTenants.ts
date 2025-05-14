import { useEffect, useState } from 'react'

import { DEFAULT_TENANT, Tenant } from '../redux/slices/tenant'

async function fetchTenant(domain: string, setTenant: (tenant: Tenant) => void) {
  let updated = false
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tenant/${domain}`)

    const data = await res.json()

    if (data && !data.error) {
      setTenant(data)
      localStorage.setItem('tenantName', data.slug)
      localStorage.setItem('tenant', JSON.stringify(data))
      updated = true
    }
  } finally {
    if (updated) return
    setTenant(DEFAULT_TENANT)
    localStorage.setItem('tenantName', DEFAULT_TENANT.slug)
    localStorage.setItem('tenant', JSON.stringify(DEFAULT_TENANT))
  }
}
function getDomain() {
  if (typeof window === 'object') {
    let domain = window.location.hostname

    if (domain) {
      return domain === 'localhost' ? 'codetribe' : domain
    }
  }

  return 'codetribe'
}

export function useTenants() {
  const [tenant, setTenant] = useState<Tenant>()
  useEffect(() => {
    let savedTenantJson = localStorage.getItem('tenant')
    let savedTenant: Tenant | null = null
    try {
      savedTenant = savedTenantJson ? JSON.parse(savedTenantJson) : null
    } catch (e) {
    } finally {
      if (savedTenant) {
        setTenant(savedTenant)
      } else {
        let domain = getDomain()
        fetchTenant(domain, setTenant)
      }
    }
  }, [])

  return tenant
}
