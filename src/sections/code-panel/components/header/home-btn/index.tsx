import { Link } from '@mui/material'
import { IoHomeOutline } from '@react-icons/all-files/io5/IoHomeOutline'
import NextLink from 'next/link'

import { STUDENT_PATH_DASHBOARD } from '@root/src/routes/student.paths'

function HomeBtn() {
  return (
    <Link
      component={NextLink}
      href={STUDENT_PATH_DASHBOARD.class.root}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'GrayText' }}
    >
      <IoHomeOutline size={26} />
    </Link>
  )
}

export default HomeBtn
