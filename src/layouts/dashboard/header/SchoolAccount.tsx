import { useEffect } from 'react'

import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import { ISchool } from '@/redux/services/interfaces/school.interface'
import { useGetMySchoolsQuery } from '@/redux/services/manager/schools-manager'
import { setSchool } from '@/redux/slices/manager'
import { RootState } from '@/redux/store'

export default function SchoolAccount(): React.ReactElement | null {
  const dispatch = useDispatch()
  const schoolId = useSelector((state: RootState) => state.manager.schoolId)

  const { data: schools } = useGetMySchoolsQuery({})

  useEffect(() => {
    if (!schools?.data) return
    dispatch(setSchool(!(schoolId === '') ? schoolId : schools.data[0] ? schools.data[0].id : ''))
  }, [schools])

  if (!schools?.data) return null

  const onChange = (e: SelectChangeEvent<string>): void => {
    dispatch(setSchool(e.target.value))
  }

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel>School</InputLabel>
        <Select
          value={schoolId}
          label='School'
          onChange={onChange}
          sx={{
            outline: 'none',
            height: 40,
            width: { xs: '150px', sm: '250px' },
          }}
        >
          {schools?.data?.map((school: ISchool) => (
            <MenuItem
              key={school.id}
              value={school.id}
            >
              {school.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}
