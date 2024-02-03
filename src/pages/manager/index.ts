import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { MANAGER_PATH_DASHBOARD } from '@/routes/manager.paths'

export default function Index(): null {
  const { replace } = useRouter()

  useEffect(() => {
    replace(MANAGER_PATH_DASHBOARD.school.root)
  }, [])

  return null
}
