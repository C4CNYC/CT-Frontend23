import { ReactNode } from 'react'

import { TableCell, TableSortLabel, Tooltip } from '@mui/material'

interface ITableHeadItem {
  name: ReactNode
  tooltipText: ReactNode
  type: ReactNode
  id: string
  sortDirection: 'asc' | 'desc'
  setSortDirection: (direction: 'asc' | 'desc') => void
  orderBy: string
  setOrderBy: (direction: string) => void
}

export default function TableHeadItem({
  name,
  tooltipText,
  type,
  sortDirection,
  setSortDirection,
  orderBy,
  setOrderBy,
  id,
}: ITableHeadItem) {
  const changeSortDirection = () => {
    const isAsc = orderBy === id && sortDirection === 'asc'
    setSortDirection(isAsc ? 'desc' : 'asc')
    setOrderBy(id)
  }

  return (
    <TableCell
      size='small'
      sx={{ maxWidth: 150 }}
      sortDirection={sortDirection}
    >
      <TableSortLabel
        active={orderBy === id}
        direction={orderBy === id ? sortDirection : 'asc'}
        onClick={changeSortDirection}
        sx={{
          maxWidth: 150,
        }}
      >
        <Tooltip
          title={tooltipText}
          placement='top'
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              color: '#212B36',
              overflow: 'hidden',
            }}
          >
            <span
              style={{
                fontSize: 10,
                lineHeight: '4px',
                marginTop: 2,
                textTransform: 'uppercase',
              }}
            >
              {type}
            </span>
            <span
              style={{
                textWrap: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              }}
            >
              {name}
            </span>
          </div>
        </Tooltip>
      </TableSortLabel>
    </TableCell>
  )
}
