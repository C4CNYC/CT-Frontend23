import { type FC } from 'react'

import { Stack } from '@mui/system'
import { useDispatch } from 'react-redux'

import { setTab } from '@/redux/slices/mobile-tab-manager'
import { useSelector } from '@/redux/store'

import Menu from '../options/menu'
import SmallScreenTabs from '../options/small-screen-tabs'

const MobileBar: FC = () => {
  const dispatch = useDispatch()
  const activeTab = useSelector((state) => state.mobileTabManager.activeTab)

  return (
    <Stack sx={STACK_STYLES}>
      <SmallScreenTabs
        index={activeTab}
        onChangeIndex={(value) => {
          dispatch(setTab(value))
        }}
      />
      <Menu />
    </Stack>
  )
}

const STACK_STYLES = {
  width: '100%',
  height: '25px',
  flexDirection: 'row',
  alignItems: 'center',
}

export default MobileBar
