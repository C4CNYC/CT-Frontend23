import { Link } from '@mui/material'
import { BiHomeAlt2 } from '@react-icons/all-files/bi/BiHomeAlt2'
import NextLink from 'next/link'

import { STUDENT_PATH_DASHBOARD } from '@root/src/routes/student.paths'

function HomeBtn() {
  return (
    <Link
      component={NextLink}
      href={STUDENT_PATH_DASHBOARD.class.root}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#637381' }}
    >
      <BiHomeAlt2 size={22} />
    </Link>
  )
}

export default HomeBtn
