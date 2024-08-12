import { TableCell, TableSortLabel, Tooltip, Typography } from '@mui/material'

import ProgressIcon from './ProgressIcon'

interface ITableHeadLesson {
  collapsed?: boolean
  type: string
  name: string
  description: string
  id: string
  sortDirection: 'asc' | 'desc'
  setSortDirection: (direction: 'asc' | 'desc') => void
  orderBy: string
  setOrderBy: (direction: string) => void
}

export default function TableHeadLesson({
  collapsed = true,
  type,
  name,
  description,
  sortDirection,
  setSortDirection,
  orderBy,
  setOrderBy,
  id,
}: ITableHeadLesson) {
  const changeSortDirection = () => {
    const isAsc = orderBy === id && sortDirection === 'asc'
    setSortDirection(isAsc ? 'desc' : 'asc')
    setOrderBy(id)
  }

  return (
    <TableCell
      size='small'
      sx={
        !collapsed
          ? {
              padding: 0,
              maxWidth: 100,
            }
          : { maxWidth: 100 }
      }
    >
      <TableSortLabel
        active={orderBy === id}
        direction={orderBy === id ? sortDirection : 'asc'}
        onClick={changeSortDirection}
      >
        <Tooltip
          title={
            <Typography variant='body2'>
              {name} - {description}
            </Typography>
          }
          placement='top'
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              textWrap: 'nowrap',
            }}
          >
            {collapsed ? (
              <div
                style={{
                  textWrap: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}
              >
                <ProgressIcon
                  type={type}
                  isWrapped
                />
                {name}
              </div>
            ) : (
              <div
                style={{
                  padding: '6px 16px',
                  backgroundColor: 'beige',
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  textWrap: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 6,
                  }}
                >
                  <ProgressIcon type={type} />
                  <Typography variant='body2'>Practical</Typography>
                </div>
                {name} {description}
              </div>
            )}
          </div>
        </Tooltip>
      </TableSortLabel>
    </TableCell>
  )
}
