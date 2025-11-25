import { Skeleton, Stack, useTheme } from '@mui/material'

import { Unit } from '@/redux/interfaces/challenges.interface'
import { useGetStudentLastVisitedUnitAndLessonQuery } from '@/redux/services/manager/lesson-student'

import ModuleItem from './module-item'

interface ModulesListBlockProps {
  modules: Unit[] | undefined
  profile: any
}
export default function ModulesListBlock({
  modules,
  profile,
}: ModulesListBlockProps): React.ReactElement {
  const theme = useTheme()
  const { data: lastVisitedData } = useGetStudentLastVisitedUnitAndLessonQuery(
    null as unknown as void,
    { skip: !profile }
  )

  return (
    <Stack
      sx={{
        background: theme.palette.mode === 'light' ? '#ECF4FF' : theme.palette.background.neutral,
        px: { xs: 1, lg: 2, xl: 3 },
        py: 4,
        borderRadius: 3,
        gap: 3,
      }}
    >
      {modules?.length
        ? modules?.map((m) => (
            <ModuleItem
              key={m.id}
              unit={m}
              lastVisited={m.id === lastVisitedData?.lastVisitedUnitId}
              profile={profile}
            />
          ))
        : Array.from('12345').map((el) => (
            <Skeleton
              key={el}
              variant='rounded'
              sx={{
                width: '100%',
                height: '200px',
                mb: '24px',
                background: '#fff',
                display: 'flex',
              }}
            />
          ))}
    </Stack>
  )
}
