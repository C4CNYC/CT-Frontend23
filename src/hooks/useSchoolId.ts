import { useSelector } from 'react-redux'

import { RootState } from '../redux/store'

export const useSchoolId = () => {
  const schoolId = localStorage.getItem('x-school-id')
  const managerSchool = useSelector((state: RootState) => state.manager.schoolId)

  return schoolId || managerSchool
}
