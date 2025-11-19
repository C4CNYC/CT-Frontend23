import React, { useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import { Box, Drawer, IconButton, Stack, useMediaQuery, useTheme } from '@mui/material'
import { BiSave } from '@react-icons/all-files/bi/BiSave'
import { BsArrowsFullscreen } from '@react-icons/all-files/bs/BsArrowsFullscreen'
import { TbArrowsMinimize } from '@react-icons/all-files/tb/TbArrowsMinimize'
import { useSnackbar } from 'notistack'

import { UseBoolean } from '@root/src/hooks/use-boolean'
import { APIError } from '@root/src/redux/interfaces/custom-error.interface'
import { useUpdateProjectMutation } from '@root/src/redux/services/manager/gallery-student'

import { EXPAND_BTN_SX } from '../constants'
import { useGalleryDrawerContext } from '../context/gallery-drawer-context'

import BrowserTab from './BrowserTab'
import CustomTabs from './CustomTabs'
import GalleryCodeTab from './GalleryCodeTab'
import ModalFooter from './ModalFooter'
import { ArrowLeft, ArrowRight } from './navigation'

type GalleryDialog = {
  drawer: UseBoolean
}

export default function GalleryDrawer({ drawer }: GalleryDialog): React.ReactElement {
  const { currentProject, code, resetCurrent } = useGalleryDrawerContext()
  const theme = useTheme()

  const { enqueueSnackbar } = useSnackbar()
  const isMobile = useMediaQuery(theme.breakpoints.down(600))

  const [fullWidth, setFullWidth] = useState<boolean>(false)
  const [value, setValue] = useState<number>(0)

  const [updateProject] = useUpdateProjectMutation()

  const drawerWidth = fullWidth || isMobile ? '100vw' : '540px'

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const switchTab = () => setValue((prev) => (prev === 1 ? 0 : 1))

  const handleFullWidth = () => {
    setFullWidth(!fullWidth)
  }

  const closeAndReset = () => {
    drawer.onFalse()
    resetCurrent()
  }

  const onUpdate = async (): Promise<void> => {
    const updatedItem = {
      title: currentProject?.title,
      description: currentProject?.description,
      language: currentProject?.language,
      body: JSON.stringify({ body: { code } }),
    }
    try {
      await updateProject({ id: currentProject?.id as string, ...updatedItem }).unwrap()
      enqueueSnackbar('Updated successfully')
    } catch (error: any) {
      const typedError = error as APIError
      enqueueSnackbar(typedError.data.message, {
        variant: 'error',
      })
    }
  }
  return (
    <Drawer
      open={drawer.value}
      onClose={closeAndReset}
      anchor='right'
      slotProps={{ backdrop: { sx: { background: 'rgba(225, 225, 225, .1)' } } }}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Stack
        direction='row'
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 1,
          background: theme.palette.grey[100],
        }}
      >
        <IconButton
          sx={{ mt: 0.5 }}
          onClick={onUpdate}
        >
          <BiSave
            size='22px'
            color='#75CF6D'
          />
        </IconButton>
        <CustomTabs
          handleChange={handleChange}
          switchTab={switchTab}
          value={value}
        />
        <IconButton
          sx={{ mt: 0.5 }}
          onClick={closeAndReset}
        >
          <CloseIcon />
        </IconButton>
      </Stack>
      <TabPanel
        value={value}
        index={0}
      >
        <BrowserTab />
      </TabPanel>
      <TabPanel
        value={value}
        index={1}
      >
        <GalleryCodeTab />
      </TabPanel>
      <ArrowLeft />
      <ArrowRight />
      <ModalFooter />
      {!isMobile ? (
        <Box sx={EXPAND_BTN_SX}>
          <IconButton onClick={handleFullWidth}>
            {fullWidth ? <TbArrowsMinimize size='20px' /> : <BsArrowsFullscreen size='20px' />}
          </IconButton>
        </Box>
      ) : null}
    </Drawer>
  )
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
  sx?: Record<string, unknown>
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <Box
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      sx={{ height: 'calc(100% - 106px)' }}
    >
      {value === index && children}
    </Box>
  )
}
