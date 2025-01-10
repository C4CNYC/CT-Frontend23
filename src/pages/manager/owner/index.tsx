import { useState } from 'react'

import { Box, Container, Grid, Stack, Tab, Tabs } from '@mui/material'
import Head from 'next/head'

import {
  CustomBreadcrumbs,
  EmptyContent,
  LoadingScreen,
  useSettingsContext,
} from '@root/src/components'
import DashboardLayout from '@root/src/layouts/dashboard'
import { useGetOwnerOrgQuery } from '@root/src/redux/services/admin/organization-admin'
import { HomePageType } from '@root/src/redux/services/enums/administration.enum'
import { MANAGER_PATH_DASHBOARD } from '@root/src/routes/manager.paths'
import { STUDENT_PATH_DASHBOARD } from '@root/src/routes/student.paths'
import CustomCodeOwnerTab from '@root/src/sections/owner/CustomCodeOwnerTab'
import FaviconOwnerTab from '@root/src/sections/owner/FaviconOwnerTab'
import LogoMiniOwnerTab from '@root/src/sections/owner/LogoMiniOwnerTab'
import LogoOwnerTab from '@root/src/sections/owner/LogoOwnerTab'
import MainOwnerTab from '@root/src/sections/owner/MainOwnerTab'
import { useTranslate } from '@root/src/utils/translateHelper'

OwnerPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>

export default function OwnerPage(): React.ReactElement {
  const translate = useTranslate()
  const { themeStretch } = useSettingsContext()

  const [value, setValue] = useState(0)

  const { data, isLoading } = useGetOwnerOrgQuery()

  const handleChange = (_: React.SyntheticEvent, newValue: number): void => {
    setValue(newValue)
  }

  if (isLoading) return <LoadingScreen />

  if (!data) return <EmptyContent title={translate('owner_empty_text')} />

  return (
    <>
      <Head>
        <title> {translate('Administration')} | CodeTribe</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading=''
          links={[
            {
              name: translate('home'),
              href: STUDENT_PATH_DASHBOARD.class.root,
            },
            {
              name: translate('administration_title'),
              href: MANAGER_PATH_DASHBOARD.owner.root,
            },
          ]}
        />

        <Stack sx={{ pt: 4 }}>
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
            {data.home_page_type === HomePageType.Custom ? (
              <Tab
                label={translate('Code')}
                {...a11yProps(5)}
              />
            ) : null}
          </Tabs>
          <TabPanel
            value={value}
            index={0}
          >
            <MainOwnerTab org={data} />
          </TabPanel>
          <TabPanel
            value={value}
            index={1}
          >
            <LogoOwnerTab
              id={data?.id as string}
              logo={data.logo}
            />
          </TabPanel>
          <TabPanel
            value={value}
            index={2}
          >
            <LogoMiniOwnerTab
              id={data?.id as string}
              logoMini={data.min_logo}
            />
          </TabPanel>
          <TabPanel
            value={value}
            index={3}
          >
            <FaviconOwnerTab
              id={data?.id as string}
              favicon={data.favicon}
            />
          </TabPanel>
          <TabPanel
            value={value}
            index={4}
          >
            <CustomCodeOwnerTab
              id={data?.id as string}
              code={data.home_page_body}
            />
          </TabPanel>
        </Stack>
      </Container>
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
      {value === index && (
        <Box>
          <Grid
            container
            pt={3}
            sx={{ flex: 1 }}
          >
            <Grid
              item
              xs={12}
              md={value !== 4 ? 8 : 12}
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
