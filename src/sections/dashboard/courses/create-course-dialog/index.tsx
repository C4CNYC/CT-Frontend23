import React from 'react'
import { useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import { Box, DialogContent, IconButton, Tab, Tabs } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'

import { CourseModuleAutocomplete } from '@/components'
import { useTranslate } from '@/utils/translateHelper'

import AuthorsTab from '../authors-tab/AuthorsTab'

import { CreateCourseDialogProps, DIALOG_TITLE_SX, TAB_PANEL_SX } from './constants'
import DetailsTab from './DetailsTab'
import GeneralTab from './GeneralTab'

export default function CreateCourseDialog({
  id,
  isEdit = false,
  children,
  defaultValues,
  refetch,
}: CreateCourseDialogProps): React.ReactElement {
  const translate = useTranslate()

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number): void => {
    setValue(newValue)
  }

  const handleClickOpen = (): void => {
    setOpen(true)
  }

  const handleClose = (): void => {
    setOpen(false)
  }

  return (
    <>
      <Box onClick={handleClickOpen}>{children}</Box>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth='xs'
      >
        <DialogTitle
          variant='h5'
          sx={DIALOG_TITLE_SX}
        >
          {isEdit ? translate('actions_edit') : translate('courses_create')}
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 0 }}>
          {isEdit ? (
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label='basic tabs example'
                sx={{
                  ml: 3,
                }}
              >
                <Tab
                  label={translate('general')}
                  {...a11yProps(0)}
                />
                <Tab
                  label={translate('details')}
                  {...a11yProps(1)}
                />
                <Tab
                  label={translate('courses_modules')}
                  {...a11yProps(2)}
                />
                <Tab
                  label={translate('courses_authors')}
                  {...a11yProps(3)}
                />
              </Tabs>
            </Box>
          ) : null}
          <TabPanel
            value={value}
            index={0}
          >
            <GeneralTab
              handleClose={handleClose}
              id={id}
              refetch={refetch}
              defaultValues={defaultValues}
              isEdit={isEdit}
            />
          </TabPanel>
          <TabPanel
            value={value}
            index={1}
          >
            <DetailsTab
              handleClose={handleClose}
              refetch={refetch}
              defaultValues={defaultValues}
              id={id}
              isEdit={isEdit}
            />
          </TabPanel>
          <TabPanel
            value={value}
            index={2}
          >
            <CourseModuleAutocomplete id={id} />
          </TabPanel>
          <TabPanel
            value={value}
            index={3}
          >
            <AuthorsTab courseId={id} />
          </TabPanel>
        </DialogContent>
      </Dialog>
    </>
  )
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps): React.ReactElement {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={TAB_PANEL_SX}>{children}</Box>}
    </div>
  )
}

function a11yProps(index: number): Record<string, string> {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}
