import React from 'react'
import { useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Button, Stack } from '@mui/material'
import { Box, Grid, Tab, Tabs } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { useAuthContext } from '@/auth/useAuthContext'
import { useSnackbar, FormProvider } from '@/components'
import { Role } from '@/redux/services/enums/role.enum'
import { useTranslate } from '@/utils/translateHelper'
import { HomePageType } from '@root/src/redux/services/enums/administration.enum'
import { IAdministration } from '@root/src/redux/services/interfaces/administration'
import {
  useCreateOrgMutation,
  useUpdateOrgMutation,
} from '@root/src/redux/services/manager/super-admin'

import CatalogTab from './CatalogTab'
import { TAB_SX, FormValuesProps } from './constants'
import CustomCodeTab from './CustomCodeTab'
import FaviconTab from './FaviconTab'
import LogoMiniTab from './LogoMiniTab'
import LogoTab from './LogoTab'
import MainTab from './MainTab'
import MetaTab from './MetaTab'
import SettingsTab from './SettingsTab'

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

  const translate = useTranslate()
  const { enqueueSnackbar } = useSnackbar()

  const [createOrg, { isLoading }] = useCreateOrgMutation()
  const [updateOrg, { isLoading: isUpdating }] = useUpdateOrgMutation()

  const CreateOrgSchema = Yup.object().shape({
    name: Yup.string().required(translate('name_validation_msg')),
    slug: Yup.string()
      .matches(/^[a-z0-9-]+$/, translate('slug_validation_msg_1'))
      .transform((value) => (value ? value.toLowerCase().trim() : value))
      .required('slug_validation_msg_2'),
    domain: Yup.string()
      .transform((value) => ',' + value.join(',') + ',')
      .required('domain_validation_msg'),
    home_page_type: Yup.mixed<HomePageType>()
      .oneOf(Object.values(HomePageType), translate('home_page_type_validation_msg'))
      .required(translate('home_page_type_required_msg')),
  })

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(CreateOrgSchema),
    defaultValues: {
      name: org?.name,
      slug: org?.slug,
      domain: org?.domain?.split(',').filter(Boolean) ?? [],
      home_page_type: org?.home_page_type ?? HomePageType.Default,
      meta: org?.meta ?? {},
    },
  })
  const { isValid, isSubmitting, isDirty } = methods.formState

  const onSubmit = async (data: FormValuesProps): Promise<void> => {
    try {
      let domain = Array.isArray(data.domain) ? data.domain.join(',') : data.domain || ''
      if (org) {
        await updateOrg({ id: org.id, ...data, domain }).unwrap()
        enqueueSnackbar(translate('messages_update_success'))
      } else {
        await createOrg({ ...data, domain }).unwrap()
        enqueueSnackbar(translate('messages_create_success'))
        methods.reset()
        handleClose()
      }
    } catch (e: any) {
      enqueueSnackbar(e?.data?.message ?? translate('message_error'), { variant: 'error' })
    }
  }

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
        maxWidth='sm'
        fullWidth
      >
        <FormProvider
          methods={methods}
          onSubmit={methods.handleSubmit(onSubmit)}
          style={{ height: '100%' }}
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
                    label={translate('Meta')}
                    {...a11yProps(4)}
                  />
                  <Tab
                    label={translate('Catalog')}
                    {...a11yProps(5)}
                  />
                  {isSuperAdmin ? (
                    <Tab
                      label={translate('Settings')}
                      {...a11yProps(6)}
                    />
                  ) : null}
                  {org.home_page_type === HomePageType.Custom ? (
                    <Tab
                      label={translate('Code')}
                      {...a11yProps(7)}
                    />
                  ) : null}
                </Tabs>
              ) : null}
            </Box>
            <TabPanel
              value={value}
              index={0}
            >
              <MainTab />
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
              <MetaTab />
            </TabPanel>
            <TabPanel
              value={value}
              index={5}
            >
              <CatalogTab org={org} />
            </TabPanel>
            {isSuperAdmin ? (
              <TabPanel
                value={value}
                index={6}
              >
                <SettingsTab />
              </TabPanel>
            ) : null}
            <TabPanel
              value={value}
              index={7}
            >
              <CustomCodeTab
                handleClose={handleClose}
                code={org?.home_page_body}
                id={org?.id as string}
              />
            </TabPanel>
          </DialogContent>
          {value === 0 || value === 4 || value === 6 ? (
            <DialogActions>
              <Stack
                sx={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  gap: 2,
                }}
              >
                <Button onClick={handleClose}>{translate('actions_close')}</Button>

                <LoadingButton
                  type='submit'
                  variant='contained'
                  loading={isLoading || isUpdating}
                  disabled={!isDirty || !isValid || isSubmitting}
                >
                  {translate(org ? 'actions_update' : 'actions_create')}
                </LoadingButton>
              </Stack>
            </DialogActions>
          ) : null}
        </FormProvider>
      </Dialog>
    </>
  )
}
