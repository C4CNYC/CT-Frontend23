import { useState } from 'react'

import { Box, Drawer, IconButton, Tab, Tabs, useMediaQuery, useTheme } from '@mui/material'

import { Iconify } from '@root/src/components'

import {
  DRAWER_WIDTH_PADDING,
  MENU_BTN_POSITION,
  MOBILE_DRAWER_WIDTH_PADDING,
  TABS_SX,
} from './constants'
import TemplatesList from './TemplatesList'

const TeamplatesMenu = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const [value, setValue] = useState(0)
  const [isOpenDrawer, setIsOpenDrawer] = useState(true)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const handleDrawerOpen = () => {
    setIsOpenDrawer(true)
  }

  const handleDrawerClose = () => {
    setIsOpenDrawer(false)
  }

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props

    return (
      <div
        role='tabpanel'
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box
            sx={{
              pl:
                isMobile && !isOpenDrawer
                  ? `${MOBILE_DRAWER_WIDTH_PADDING}px`
                  : `${DRAWER_WIDTH_PADDING}px`,
              pr: 3,
              pb: 2,
              pt: 1,
            }}
          >
            {children}
          </Box>
        )}
      </div>
    )
  }

  return (
    <>
      {isMobile ? (
        !isOpenDrawer ? (
          <IconButton
            sx={MENU_BTN_POSITION}
            onClick={handleDrawerOpen}
          >
            <Iconify
              icon='ri:menu-fold-4-fill'
              color={theme.palette.primary.main}
            />
          </IconButton>
        ) : (
          <IconButton
            sx={MENU_BTN_POSITION}
            onClick={handleDrawerClose}
          >
            <Iconify
              icon='ri:menu-fold-3-fill'
              color={theme.palette.primary.main}
            />
          </IconButton>
        )
      ) : null}
      <Drawer
        anchor='left'
        variant='persistent'
        open={isOpenDrawer}
        ModalProps={{
          container: document.getElementById('drawer-container'),
          style: { position: 'absolute' },
        }}
        PaperProps={{ style: { position: 'absolute', width: DRAWER_WIDTH_PADDING } }}
        BackdropProps={{ style: { position: 'absolute' } }}
      >
        <Tabs
          orientation='vertical'
          value={value}
          onChange={handleChange}
          aria-label='Vertical tabs'
          sx={TABS_SX}
        >
          <Tab
            label='Normal'
            {...a11yProps(0)}
            sx={{ justifyContent: 'flex-start', ml: 2 }}
          />
          <Tab
            label='HTML'
            {...a11yProps(1)}
            sx={{ justifyContent: 'flex-start', ml: 2 }}
          />
          <Tab
            sx={{ mr: { xs: '24px', md: '40px' }, justifyContent: 'flex-start', ml: 2 }}
            label='With AI'
            {...a11yProps(2)}
          />
        </Tabs>
      </Drawer>
      <TabPanel
        value={value}
        index={0}
      >
        <TemplatesList />
      </TabPanel>
      <TabPanel
        value={value}
        index={1}
      >
        <TemplatesList />
      </TabPanel>
      <TabPanel
        value={value}
        index={2}
      >
        <TemplatesList />
      </TabPanel>
    </>
  )
}

export default TeamplatesMenu

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  }
}
