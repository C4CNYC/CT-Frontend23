import React from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material'

import { accessControlApi } from '@/redux/services/public/access-control-public'

import { UserAccessControlTableLine } from './UserAccessControlTableLine'

type AccessControlTableType = React.FC<{ userId: string }>

export const UserAccessControlTable: AccessControlTableType = ({ userId }) => {
  const { useGetAllFeaturesQuery, useGetByUserIdQuery, useAddFeatureMutation } = accessControlApi

  const { data: accessData } = useGetAllFeaturesQuery()
  const { data: userAccessData } = useGetByUserIdQuery({ userId })

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Feature</TableCell>
            <TableCell>Max Usage Count</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {accessData?.map((accessControl) => {
            let userACK = userAccessData?.find((item) => item.feature === accessControl.feature)
            return (
              <UserAccessControlTableLine
                key={accessControl.feature}
                accessControl={accessControl}
                userACK={userACK}
                userId={userId}
              />
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
