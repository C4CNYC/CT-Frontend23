import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { MANAGER_PATH_DASHBOARD } from '@/routes/manager.paths'

export default function ClassSettingPage(): React.ReactElement | null {
  const router = useRouter()
  useEffect(() => {
    router.replace(`${MANAGER_PATH_DASHBOARD.stream}/some_id`)
  }, [])
  return null
}
