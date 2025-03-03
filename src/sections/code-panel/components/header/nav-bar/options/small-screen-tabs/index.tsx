import { useEffect, type FC } from 'react'

import { Collapse, Tab, Tabs } from '@mui/material'
import { Box } from '@mui/system'
import { FaCode } from '@react-icons/all-files/fa6/FaCode'
import { IoDesktopOutline } from '@react-icons/all-files/io5/IoDesktopOutline'
import { MdOutlinePlayLesson } from '@react-icons/all-files/md/MdOutlinePlayLesson'

import { voidFunction } from '@/utils'
import { showTabs } from '@root/src/redux/slices/mobile-tab-manager'
import { useDispatch, useSelector } from '@root/src/redux/store'

import { styles } from './styles'

interface ISmallScreenTabs {
  index: number
  onChangeIndex: (v: number) => void
}

const SmallScreenTabs: FC<ISmallScreenTabs> = ({ index, onChangeIndex }) => {
  const dispatch = useDispatch()
  const isVisible = useSelector((state) => state.mobileTabManager.tabsVisible)
  const activeTab = useSelector((state) => state.mobileTabManager.activeTab)

  useEffect(() => {
    if (!isVisible) return
    const timeout = setTimeout(() => {
      dispatch(showTabs(false))
    }, 3000)
    return () => clearTimeout(timeout)
  }, [isVisible, activeTab])

  return (
    <Box sx={styles.Box}>
      <Collapse in={isVisible}>
        <Tabs
          aria-label='lesson tabs'
          id='unit-page-tabs'
          indicatorColor='primary'
          className='smallSliderTour'
          onChange={(e, v) => {
            onChangeIndex(v)
          }}
          textColor='primary'
          value={index}
          sx={styles.Tabs}
          TabIndicatorProps={TAB_INDICATOR_PROPS}
          scrollButtons={false}
        >
          <Tab
            {...a11yProps(0)}
            onClick={voidFunction}
            aria-label='Lesson'
            icon={<MdOutlinePlayLesson size={20} />}
            sx={index === 0 ? styles.activeTab : styles.Tab}
            label={index === 0 ? <div style={styles.slides}>Slides</div> : ''}
          />
          <Tab
            {...a11yProps(1)}
            aria-label='Code'
            icon={<FaCode size={20} />}
            sx={index === 1 ? styles.activeTab : styles.Tab}
            label={index === 1 ? <div style={styles.slides}>Editor</div> : ''}
          />
          <Tab
            {...a11yProps(0)}
            aria-label='Preview'
            icon={<IoDesktopOutline size={20} />}
            sx={index === 2 ? styles.activeTab : styles.Tab}
            label={index === 2 ? <div style={styles.slides}>Browser</div> : ''}
          />
        </Tabs>
      </Collapse>
    </Box>
  )
}

const TAB_INDICATOR_PROPS = {
  style: {
    background: 'transparent',
  },
}

function a11yProps(index: number): Record<string, string> {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

export default SmallScreenTabs
