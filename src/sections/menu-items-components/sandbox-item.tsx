import DefaultMenuItem from './default-item'

export default function SandboxMenuItem(): React.ReactElement {
  return (
    <DefaultMenuItem
      title='sidebar_menu_sandbox'
      icon='/assets/menu-icons/sandbox.svg'
      tooltip='sidebar_menu_sandbox_tooltip'
    />
  )
}
