import { Link } from '@mui/material'
import NextLink from 'next/link'

import { Iconify } from '@root/src/components'
import { STUDENT_PATH_DASHBOARD } from '@root/src/routes/student.paths'

import DefaultMenuItem from './default-item'

export default function SandboxMenuItem(): React.ReactElement {
  return (
    <Link
      component={NextLink}
      href={STUDENT_PATH_DASHBOARD.codePanel.sandbox}
      underline='none'
      className='defaultIntroStudentStep2 studentJoinStep3'
    >
      <DefaultMenuItem
        title='sidebar_menu_sandbox'
        icon={<Iconify icon='tabler:sandbox' />}
        tooltip='sidebar_menu_sandbox_tooltip'
      />
    </Link>
  )
}
