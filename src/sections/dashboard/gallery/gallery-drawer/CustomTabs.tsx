import React from 'react'

import { IconButton, Stack, Tab, Tabs } from '@mui/material'
import { FaChevronLeft } from '@react-icons/all-files/fa/FaChevronLeft'
import { FaChevronRight } from '@react-icons/all-files/fa/FaChevronRight'
import { HiCode } from '@react-icons/all-files/hi/HiCode'
import { HiOutlineDesktopComputer } from '@react-icons/all-files/hi/HiOutlineDesktopComputer'

type Props = {
  switchTab: () => void
  handleChange: (event: React.SyntheticEvent, newValue: number) => void
  value: number
}

function CustomTabs({ handleChange, switchTab, value }: Props) {
  return (
    <Stack
      direction='row'
      alignItems='center'
    >
      <IconButton onClick={switchTab}>
        <FaChevronLeft size={15} />
      </IconButton>
      <Tabs
        TabIndicatorProps={{
          sx: {
            height: '90%',
            opacity: 0.2,
            borderTopLeftRadius: '16px',
            borderTopRightRadius: '16px',
          },
        }}
        value={value}
        onChange={handleChange}
        scrollButtons={false}
        aria-label='tabs project dialog'
      >
        <Tab
          {...a11yProps(0)}
          icon={<HiOutlineDesktopComputer size='20px' />}
          label='Browser'
          sx={{
            marginRight: '0!important',
            px: '10px',
            pt: '5px',
          }}
        />
        <Tab
          {...a11yProps(1)}
          icon={<HiCode size='20px' />}
          label='Code'
          sx={{ px: '10px', pt: '5px' }}
        />
      </Tabs>
      <IconButton onClick={switchTab}>
        <FaChevronRight size={15} />
      </IconButton>
    </Stack>
  )
}

export default CustomTabs

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}
