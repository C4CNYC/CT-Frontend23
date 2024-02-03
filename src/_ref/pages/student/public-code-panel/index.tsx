import { useEffect } from 'react'

import { useRouter } from 'next/router'

import GuestGuard from '../../../../auth/GuestGuard'
import { LoadingScreen } from '../../../../components'
import { useGetPublicCourseQuery } from '../../../../redux/services/public-student'
import { STUDENT_PATH_DASHBOARD } from '../../../../routes/student.paths'

export default function Index(): React.ReactElement {
  const { push } = useRouter()

  const { data, isLoading } = useGetPublicCourseQuery({})

  useEffect(() => {
    if (!data) return
    push(`${STUDENT_PATH_DASHBOARD.publicCodePanel.workSpace(data?.data[0].id)}`)
  }, [data])
  if (isLoading || !data) return <LoadingScreen />

  return (
    <GuestGuard>
      <LoadingScreen />
    </GuestGuard>
  )
}
