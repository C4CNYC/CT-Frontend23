import { Iconify } from '@root/src/components'

import DefaultMenuItem from './default-item'

export default function MarketMenuItem(): React.ReactElement {
  return (
    <DefaultMenuItem
      title='sidebar_menu_market'
      icon={<Iconify icon='uil:shop' />}
      tooltip='sidebar_menu_market_tooltip'
    />
  )
}
