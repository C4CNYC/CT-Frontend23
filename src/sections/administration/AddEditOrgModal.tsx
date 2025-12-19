import React from 'react'
import { useState } from 'react'

import { Box, Grid, Tab, Tabs } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

import { useAuthContext } from '@/auth/useAuthContext'
import { Role } from '@/redux/services/enums/role.enum'
import { useTranslate } from '@/utils/translateHelper'
import { HomePageType } from '@root/src/redux/services/enums/administration.enum'
import { IAdministration } from '@root/src/redux/services/interfaces/administration'

import CatalogTab from './CatalogTab'
import { TAB_SX } from './constants'
import CustomCodeTab from './CustomCodeTab'
import LogoTab from './LogoTab'
import MainTab from './MainTab'
import MetaTab from './MetaTab'
import SettingsTab from './SettingsTab'
import SettingsTabForAdmins from './SettingsTabForAdmins'

interface Prop {
  org?: IAdministration
  children: React.ReactElement
  isEdit?: boolean
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

export default function AddEditOrgModal({ children, org }: Prop): React.ReactElement {
  const [open, setOpen] = useState(false)
  const [value, setValue] = React.useState(0)
  const { user } = useAuthContext()
  const isSuperAdmin = user?.role === Role.SuperAdmin
  const isAdmin = user?.role === Role.Admin

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

  const tabs = [
    {
      label: translate('general'),
      component: (
        <MainTab
          org={org}
          handleClose={handleClose}
        />
      ),
    },
    {
      label: translate('Logo'),
      component: (
        <LogoTab
          org={org}
          handleClose={handleClose}
        />
      ),
    },
    {
      label: translate('Meta'),
      component: (
        <MetaTab
          org={org}
          handleClose={handleClose}
        />
      ),
    },
    { label: translate('Catalog'), component: <CatalogTab org={org} /> },
    ...(isSuperAdmin
      ? [
          {
            label: translate('Settings'),
            component: (
              <SettingsTab
                org={org}
                handleClose={handleClose}
              />
            ),
          },
        ]
      : []),
    ...(isAdmin || isSuperAdmin
      ? [
          {
            label: translate(isSuperAdmin ? 'Settings (Admin)' : 'Settings'),
            component: (
              <SettingsTabForAdmins
                org={org}
                handleClose={handleClose}
              />
            ),
          },
        ]
      : []),
    ...(org?.home_page_type === HomePageType.Custom
      ? [
          {
            label: translate('Landing Page'),
            component: (
              <CustomCodeTab
                handleClose={handleClose}
                id={org?.id!}
                code={org?.home_page_body}
              />
            ),
          },
        ]
      : []),
  ]

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
        maxWidth='sm'
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
                {tabs.map((tab, i) => (
                  <Tab
                    key={i}
                    label={tab.label}
                    {...a11yProps(i)}
                  />
                ))}
              </Tabs>
            ) : null}
          </Box>
          {tabs.map((tab, i) => (
            <TabPanel
              key={i}
              value={value}
              index={i}
            >
              {tab.component}
            </TabPanel>
          ))}
        </DialogContent>
        <DialogActions />
      </Dialog>
    </>
  )
}
