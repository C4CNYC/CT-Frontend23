import { useRouter } from 'next/router'

import { Iconify } from '@root/src/components'
import { STUDENT_PATH_DASHBOARD } from '@root/src/routes/student.paths'

import SelectLanguageModal from '../my-creations-menu/select-language-dialog'

import DefaultMenuItem from './default-item'

export default function SandboxMenuItem(): React.ReactElement {
  const { push } = useRouter()
  return (
    <SelectLanguageModal
      onSubmit={() => push(STUDENT_PATH_DASHBOARD.codePanel.sandbox)}
      isLoading={false}
    >
      <DefaultMenuItem
        title='sidebar_menu_sandbox'
        icon={<Iconify icon='tabler:sandbox' />}
        tooltip='sidebar_menu_sandbox_tooltip'
      />
    </SelectLanguageModal>
  )
}
