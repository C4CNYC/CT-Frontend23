import { ChangeEvent, useEffect, useState } from 'react'

import CircleIcon from '@mui/icons-material/Circle'
import { Input, TableCell, TableRow } from '@mui/material'

import { useDebounceCallback } from '@root/src/hooks'
import { IAccessControlResponse } from '@root/src/redux/services/interfaces/access-control.interface'
import { accessControlApi } from '@root/src/redux/services/public/access-control-public'

type Props = {
  accessControl: IAccessControlResponse
  userACK: IAccessControlResponse | undefined
  userId: string
}

export function UserAccessControlTableLine({ accessControl, userACK, userId }: Props) {
  const { useAddFeatureMutation } = accessControlApi
  const [addAccess, { isLoading }] = useAddFeatureMutation()
  const debounce = useDebounceCallback(500, false)
  const [maxUsageCount, setMaxUsageCount] = useState(userACK?.maxUsageCount || 0)
  useEffect(() => {
    setMaxUsageCount(userACK?.maxUsageCount || 0)
  }, [userACK])
  const onChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setMaxUsageCount(parseInt(e.target.value))
    debounce(() => {
      addAccess({
        feature: accessControl.feature,
        maxUsageCount: parseInt(e.target.value),
        userId: userId,
      })
    })
  }

  return (
    <TableRow key={accessControl.id}> 
      <TableCell>{accessControl.feature}</TableCell>
      <TableCell>
        <Input
          type='number'
          value={maxUsageCount}
          onChange={(e) => onChange(e)}
        />
        {isLoading ? <CircleIcon sx={{ ml: 1 }} /> : null}
      </TableCell> 
    </TableRow>
  )
}
