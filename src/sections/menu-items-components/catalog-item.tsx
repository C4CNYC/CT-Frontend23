import { Link } from '@mui/material'
import { IoRocketOutline } from '@react-icons/all-files/io5/IoRocketOutline'
import NextLink from 'next/link'

import { STUDENT_PATH_DASHBOARD } from '@root/src/routes/student.paths'

import DefaultMenuItem from './default-item'

export default function CatalogMenuItem(): React.ReactElement {
  return (
    <Link
      component={NextLink}
      href={STUDENT_PATH_DASHBOARD.courses.root}
      underline='none'
      className='defaultIntroStudentStep2 studentJoinStep3'
    >
      <DefaultMenuItem
        title='sidebar_menu_catalog'
        icon={
          <IoRocketOutline
            color='#5ED0D5'
            size={25}
          />
        }
        tooltip='sidebar_menu_catalog_tooltip'
      />
    </Link>
  )
}
