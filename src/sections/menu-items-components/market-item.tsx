import { BsShop } from '@react-icons/all-files/bs/BsShop'

import DefaultMenuItem from './default-item'

export default function MarketMenuItem(): React.ReactElement {
  return (
    <DefaultMenuItem
      title='sidebar_menu_market'
      icon={<BsShop />}
      tooltip='sidebar_menu_market_tooltip'
    />
  )
}
