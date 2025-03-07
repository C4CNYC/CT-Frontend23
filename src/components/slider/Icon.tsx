import { Iconify, IconifyProps } from '../iconify'

interface Props {
  icon?: IconifyProps // Right icon
}

export function LeftIcon({ icon = 'eva:arrow-ios-forward-fill' }: Props): React.ReactElement {
  return (
    <Iconify
      icon={icon}
      sx={{
        width: 20,
        height: 20,
        transform: ' scaleX(-1)',
      }}
    />
  )
}

export function RightIcon({ icon = 'eva:arrow-ios-forward-fill' }: Props): React.ReactElement {
  return (
    <Iconify
      icon={icon}
      sx={{
        width: 20,
        height: 20,
      }}
    />
  )
}
