import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { STUDENT_PATH_DASHBOARD } from '@/routes/student.paths'

export default function Index(): null {
  const { replace } = useRouter()

  useEffect(() => {
    replace(STUDENT_PATH_DASHBOARD.class.root)
  }, [])

  return null
}
