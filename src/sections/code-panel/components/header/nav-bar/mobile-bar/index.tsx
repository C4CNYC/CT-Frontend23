import { type FC } from 'react'

import { useDispatch } from 'react-redux'

import { setTab } from '@/redux/slices/mobile-tab-manager'
import { useSelector } from '@root/src/redux/store'

import Menu from '../options/menu'
import SmallScreenTabs from '../options/small-screen-tabs'

const MobileBar: FC = () => {
  const dispatch = useDispatch()
  const activeTab = useSelector((state) => state.mobileTabManager.activeTab)

  return (
    <>
      <SmallScreenTabs
        index={activeTab}
        onChangeIndex={(value) => {
          dispatch(setTab(value))
        }}
      />
      <Menu />
    </>
  )
}

export default MobileBar
