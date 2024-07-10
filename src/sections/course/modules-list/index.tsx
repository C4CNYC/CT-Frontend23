import { Skeleton, Stack, useTheme } from '@mui/material'

import { Unit } from '@/redux/interfaces/challenges.interface'

import ModuleItem from './module-item'

interface ModulesListBlockProps {
  modules: Unit[] | undefined
}
export default function ModulesListBlock({ modules }: ModulesListBlockProps): React.ReactElement {
  const theme = useTheme()

  return (
    <Stack
      sx={{
        background: theme.palette.mode === 'light' ? '#ECF4FF' : theme.palette.background.neutral,
        px: { xs: 1, lg: 2, xl: 3 },
        py: 4,
        borderRadius: 3,
        gap: 3,
        flex: 1,
      }}
    >
      {modules?.length
        ? modules?.map((m) => (
            <ModuleItem
              key={m.id}
              unit={m}
              lastVisited={false}
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
