import { ReactNode } from 'react'

import { TableCell, TableSortLabel } from '@mui/material'

interface ITableHeadSort {
  id: string
  children: ReactNode
  sortDirection: 'asc' | 'desc'
  setSortDirection: (direction: 'asc' | 'desc') => void
  orderBy: string
  setOrderBy: (direction: string) => void
}

export default function TableHeadSort({
  id,
  children,
  sortDirection,
  setSortDirection,
  orderBy,
  setOrderBy,
}: ITableHeadSort) {
  const changeSortDirection = () => {
    const isAsc = orderBy === id && sortDirection === 'asc'
    setSortDirection(isAsc ? 'desc' : 'asc')
    setOrderBy(id)
  }

  return (
    <TableCell
      size='small'
      sortDirection={sortDirection}
    >
      <TableSortLabel
        active={orderBy === id}
        direction={orderBy === id ? sortDirection : 'asc'}
        onClick={changeSortDirection}
        sx={{
          textWrap: 'nowrap',
        }}
      >
        {children}
      </TableSortLabel>
    </TableCell>
  )
}
