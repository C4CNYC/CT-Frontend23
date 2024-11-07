import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { LoadingScreen } from '@/components'
import { StudentDashboardLayout } from '@/layouts/dashboard'
import { useGetStudentClassesQuery } from '@/redux/services/manager/classes-student'
import { useSelector } from '@/redux/store'
import { STUDENT_PATH_DASHBOARD } from '@/routes/student.paths'
import { useGetLastActiveTribeQuery } from '@root/src/redux/services/manager/activity-student'

ClassMain.getLayout = (page: React.ReactElement) => (
  <StudentDashboardLayout>{page}</StudentDashboardLayout>
)

export default function ClassMain(): React.ReactElement {
  const { push } = useRouter()
  const profile = useSelector((state) => state.global.user)

  const { data, isLoading: isLastTribeLoading } = useGetLastActiveTribeQuery()
  const { data: tribes, isLoading } = useGetStudentClassesQuery({}, { skip: !profile })

  useEffect(() => {
    if (isLoading || isLastTribeLoading) return
    if (localStorage.getItem('ON-BOARDING') === 'on-boarding') {
      push({
        pathname: STUDENT_PATH_DASHBOARD.class.createClass,
        query: { onBoarding: 'on-boarding' },
      })
      localStorage.removeItem('ON-BOARDING')
    } else if (localStorage.getItem('JOIN_TRIBE')) {
      const { joinCode, classId } = JSON.parse(localStorage.getItem('JOIN_TRIBE') ?? '{}')
      push(STUDENT_PATH_DASHBOARD.class.id(classId, { joinCode }))
    } else if (tribes?.meta.itemCount && tribes.data.length > 0) {
      push(STUDENT_PATH_DASHBOARD.class.id(data?.lastActiveTribe || tribes.data[0].id))
    } else {
      push(STUDENT_PATH_DASHBOARD.class.join)
    }
  }, [isLoading, isLastTribeLoading])

  if (isLoading) {
    return <LoadingScreen />
  }

  return <LoadingScreen />
}
