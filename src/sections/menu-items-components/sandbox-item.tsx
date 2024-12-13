import { Iconify } from '@root/src/components'

import DefaultMenuItem from './default-item'
import { SandBoxDialog } from './sandbox-dialog'

export default function SandboxMenuItem(): React.ReactElement {
  return (
    <SandBoxDialog>
      <DefaultMenuItem
        title='sidebar_menu_sandbox'
        icon={<Iconify icon='tabler:sandbox' />}
        tooltip='sidebar_menu_sandbox_tooltip'
      />
    </SandBoxDialog>
  )
}
