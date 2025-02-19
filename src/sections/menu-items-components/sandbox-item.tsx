import { TbSandbox } from 'react-icons/tb'

import DefaultMenuItem from './default-item'
import { SandBoxDialog } from './sandbox-dialog'

export default function SandboxMenuItem(): React.ReactElement {
  return (
    <SandBoxDialog>
      <DefaultMenuItem
        title='sidebar_menu_sandbox'
        icon={<TbSandbox />}
        tooltip='sidebar_menu_sandbox_tooltip'
      />
    </SandBoxDialog>
  )
}
