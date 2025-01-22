import React from 'react'
import { useState } from 'react'

import { Box, Grid, Tab, Tabs } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

import { useTranslate } from '@/utils/translateHelper'
import { IOwnerType } from '@root/src/components/org-owner-autocomplete/OrgOwnerAutocomplete'
import { IAdministration } from '@root/src/redux/services/interfaces/administration'

import { TAB_SX } from './constants'
import FaviconTab from './FaviconTab'
import LandingPageTab from './LandingPageTab'
import LogoMiniTab from './LogoMiniTab'
import LogoTab from './LogoTab'
import MainTab from './MainTab'
import OwnerTab from './OwnerTab'

interface Prop {
  org?: IAdministration
  children: React.ReactElement
  isEdit?: boolean
  owner: IOwnerType | null
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
      {value === index && (
        <Box sx={TAB_SX}>
          <Grid
            container
            spacing={3}
            sx={{ flex: 1 }}
          >
            <Grid
              item
              xs={12}
              md={12}
              sx={{ minHeight: '100%' }}
            >
              {children}
            </Grid>
          </Grid>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number): Record<string, string> {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

export default function AddEditOrgModal({ children, org, owner }: Prop): React.ReactElement {
  const [open, setOpen] = useState(false)
  const [value, setValue] = React.useState(0)

  const translate = useTranslate()

  const handleClickOpen = (): void => {
    setOpen(true)
  }

  const handleClose = (): void => {
    setOpen(false)
  }

  const handleChange = (_: React.SyntheticEvent, newValue: number): void => {
    setValue(newValue)
  }

  return (
    <>
      <Box
        onClick={() => {
          handleClickOpen()
        }}
      >
        {children}
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth='xs'
        fullWidth
      >
        <DialogTitle>
          {org?.id
            ? translate('update_org_dialog_title')
            : translate('create_new_org_dialog_title')}
        </DialogTitle>
        <DialogContent sx={{ p: 0, mt: '-10px' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', px: org?.id ? 3 : 0 }}>
            {org?.id ? (
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label='basic tabs example'
              >
                <Tab
                  label={translate('general')}
                  {...a11yProps(0)}
                />
                <Tab
                  label={translate('Logo')}
                  {...a11yProps(1)}
                />
                <Tab
                  label={translate('Logo-mini')}
                  {...a11yProps(2)}
                />
                <Tab
                  label={translate('Favicon')}
                  {...a11yProps(3)}
                />
                <Tab
                  label={translate('owner')}
                  {...a11yProps(4)}
                />
                <Tab
                  label={translate('Landing page')}
                  {...a11yProps(5)}
                />
              </Tabs>
            ) : null}
          </Box>
          <TabPanel
            value={value}
            index={0}
          >
            <MainTab
              handleClose={handleClose}
              org={org}
            />
          </TabPanel>
          <TabPanel
            value={value}
            index={1}
          >
            <LogoTab
              handleClose={handleClose}
              id={org?.id as string}
            />
          </TabPanel>
          <TabPanel
            value={value}
            index={2}
          >
            <LogoMiniTab
              handleClose={handleClose}
              id={org?.id as string}
            />
          </TabPanel>
          <TabPanel
            value={value}
            index={3}
          >
            <FaviconTab
              handleClose={handleClose}
              id={org?.id as string}
            />
          </TabPanel>
          <TabPanel
            value={value}
            index={4}
          >
            <OwnerTab
              handleClose={handleClose}
              orgId={org?.id as string}
              owner={owner}
            />
          </TabPanel>
          <TabPanel
            value={value}
            index={5}
          >
            <LandingPageTab
              handleClose={handleClose}
              code={org?.home_page_body}
              id={org?.id as string}
              home_page_type={org?.home_page_type}
            />
          </TabPanel>
        </DialogContent>
      </Dialog>
    </>
  )
}
