import { LinearProgress, TableCell, Tooltip, Typography } from '@mui/material'

interface IItem {
  name: string
  status: 'done' | 'not done' | 'in progress'
}

interface ITebleItemLesson {
  collapsed?: boolean
  progress: number
  items: IItem[]
  onClick: () => void
}

export default function TableItemLesson({
  collapsed = true,
  progress,
  items = [],
  onClick,
}: ITebleItemLesson) {
  return (
    <TableCell
      size='small'
      sx={!collapsed ? { backgroundColor: 'beige' } : {}}
    >
      <div onClick={onClick}>
        {collapsed ? (
          <Tooltip
            title={<Typography variant='body2'>{Math.floor(progress)}%</Typography>}
            placement='top'
          >
            <LinearProgress
              variant='determinate'
              value={progress}
              sx={{ height: '16px', width: '100%' }}
            />
          </Tooltip>
        ) : (
          <div
            style={{
              display: 'flex',
              flexWrap: 'nowrap',
              gap: 6,
            }}
          >
            {items.map((item) => (
              <Tooltip
                key={`table-lesson-item-${item.name}`}
                title={<Typography variant='body2'>{item.name}</Typography>}
                placement='top'
              >
                <LinearProgress
                  variant='determinate'
                  color={item.status === 'in progress' ? 'warning' : 'primary'}
                  value={item.status === 'not done' ? 0 : 100}
                  sx={{ height: '16px', width: '16px' }}
                />
              </Tooltip>
            ))}
          </div>
        )}
      </div>
    </TableCell>
  )
}
