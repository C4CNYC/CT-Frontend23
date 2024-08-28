import DefaultMenuItem from './default-item'

export default function MarketMenuItem(): React.ReactElement {
  return (
    <DefaultMenuItem
      title='sidebar_menu_market'
      icon='/assets/menu-icons/market.svg'
      tooltip='sidebar_menu_market_tooltip'
    />
  )
}
