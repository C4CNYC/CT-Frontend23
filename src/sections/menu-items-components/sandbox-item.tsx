import { Iconify } from '@root/src/components'

import DefaultMenuItem from './default-item'

export default function SandboxMenuItem(): React.ReactElement {
  return (
    <Link
      component={NextLink}
      href={STUDENT_PATH_DASHBOARD.codePanel.root}
      underline='none'
      className='defaultIntroStudentStep2 studentJoinStep3'
    >
      <DefaultMenuItem
        title='sidebar_menu_sandbox'
        icon={<Iconify icon='tabler:sandbox' />}
        tooltip='sidebar_menu_sandbox_tooltip'
      />
  )
}
