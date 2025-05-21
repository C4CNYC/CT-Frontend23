import { Link } from '@mui/material'
import { BiHomeAlt } from '@react-icons/all-files/bi/BiHomeAlt'
import NextLink from 'next/link'

import { STUDENT_PATH_DASHBOARD } from '@root/src/routes/student.paths'

function HomeBtn() {
  return (
    <Link
      component={NextLink}
      href={STUDENT_PATH_DASHBOARD.class.root}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'GrayText' }}
    >
      <BiHomeAlt size={20} />
    </Link>
  )
}

export default HomeBtn
