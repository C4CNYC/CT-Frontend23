import SandboxIcon from '@root/src/assets/icons/SandboxIcon'

import DefaultMenuItem from './default-item'
import { SandBoxDialog } from './sandbox-dialog'

export default function SandboxMenuItem(): React.ReactElement {
  return (
    <SandBoxDialog>
      <DefaultMenuItem
        title='sidebar_menu_sandbox'
        icon={<SandboxIcon />}
        tooltip='sidebar_menu_sandbox_tooltip'
      />
    </SandBoxDialog>
  )
}
