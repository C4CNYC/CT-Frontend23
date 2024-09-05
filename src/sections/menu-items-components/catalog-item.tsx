import { Link } from '@mui/material'
import NextLink from 'next/link'

import { Iconify } from '@root/src/components'
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
        icon={
          <Iconify
            icon='mingcute:rocket-line'
            color='#5ED0D5'
            width='25px'
          />
        }
        tooltip='sidebar_menu_catalog_tooltip'
      />
    </Link>
  )
}
