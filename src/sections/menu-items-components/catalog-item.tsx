import { Link } from '@mui/material'
import NextLink from 'next/link'

import { STUDENT_PATH_DASHBOARD } from '@root/src/routes/student.paths'

import DefaultMenuItem from './default-item'

export default function CatalogMenuItem(): React.ReactElement {
  return (
    <Link
      component={NextLink}
      href={STUDENT_PATH_DASHBOARD.courses.root}
      underline='none'
    >
      <DefaultMenuItem
        title='sidebar_menu_catalog'
        icon='/assets/menu-icons/catalog.svg'
        tooltip='sidebar_menu_catalog_tooltip'
      />
    </Link>
  )
}
