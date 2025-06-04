import React from 'react'

import { LineChart, txRx2ChartData } from '@root/src/components/charts/LineChart'
import { TableSimple } from '@root/src/components/table-simple/TableSimple'
import DashboardLayout from '@root/src/layouts/dashboard/DashboardLayout'
import {
  useCourseProgressStatsQuery,
  useLessonCreatedStatsQuery,
  useUserRegisteredStatsQuery,
  useLogActivityStatsQuery,
  useLogActivityLastQuery,
} from '@root/src/redux/services/manager/stats-service'

ReportsPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>
export default function ReportsPage() {
  const { data: URS } = useUserRegisteredStatsQuery({})
  // const { data: URSQ } = useUserRegisteredStatsByOrgQuery({ nDays: 30 });
  const { data: URSL } = useLessonCreatedStatsQuery({})
  const { data: URSCL } = useCourseProgressStatsQuery({})
  const { data: LogActivity } = useLogActivityStatsQuery({})
  const { data: LogActivityLast } = useLogActivityLastQuery({ nDays: 30 })
  return (
    <div>
      <h1>Manager Reports</h1>
      <div
        style={{
          padding: '2rem',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '2rem',
        }}
      >
        {[
          { data: URS, name: 'User Registration' },
          { data: URSL, name: 'Lesson Creation' },
          { data: URSCL, name: 'Completion' },
          { data: LogActivity, name: 'LogActivity' },
        ].map(({ data, name }, index) => (
          <div key={index}>
            <div style={{ marginBottom: '2rem' }}>
              <h2>{name}</h2>
              {data ? <LineChart data={txRx2ChartData(data)} /> : null}
            </div>
          </div>
        ))}
      </div>
      <TableSimple data={LogActivityLast || []} />
    </div>
  )
}
