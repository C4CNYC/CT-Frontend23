import { TbBrandCodesandbox } from '@react-icons/all-files/tb/TbBrandCodesandbox'

import DefaultMenuItem from './default-item'
import { SandBoxDialog } from './sandbox-dialog'

export default function SandboxMenuItem(): React.ReactElement {
  return (
    <SandBoxDialog>
      <DefaultMenuItem
        title='sidebar_menu_sandbox'
        icon={<TbBrandCodesandbox />}
        tooltip='sidebar_menu_sandbox_tooltip'
      />
    </SandBoxDialog>
  )
}
