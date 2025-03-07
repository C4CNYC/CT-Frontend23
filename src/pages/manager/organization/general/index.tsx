import { useState } from 'react'

import { Box, Card, Container, Stack, Tab, Tabs } from '@mui/material'
import { MdDashboardCustomize } from '@react-icons/all-files/md/MdDashboardCustomize'
import { MdOutlineContacts } from '@react-icons/all-files/md/MdOutlineContacts'
import { MdSettingsApplications } from '@react-icons/all-files/md/MdSettingsApplications'
import { RiAccountBoxFill } from '@react-icons/all-files/ri/RiAccountBoxFill'
import Head from 'next/head'
import { useSnackbar } from 'notistack'

import DashboardLayout from '@/layouts/dashboard'
import {
  useGetOrganizationQuery,
  useUpdateOrgCoverMutation,
} from '@/redux/services/admin/organization-admin'
import ContactsTab from '@/sections/dashboard/organization/general/tabs/contacts/contacts'
import CustomizationTab from '@/sections/dashboard/organization/general/tabs/customization/customization'
import UserProfileTab from '@/sections/dashboard/organization/general/tabs/profile/profile'
import SkeletonProfileOrg from '@/sections/dashboard/organization/general/tabs/profile/SkeletonProfileOrg'
import SettingsTab from '@/sections/dashboard/organization/general/tabs/settings/settings'
import { ProfileCover } from '@/sections/dashboard/user/profile'
import SkeletonSchool from '@/sections/schools/skeleton-school'
import { useTranslate } from '@/utils/translateHelper'
import { UploadImageModal, useSettingsContext } from '@root/src/components'
UserProfilePage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>

export default function UserProfilePage(): React.ReactElement {
  const translate = useTranslate()

  const { enqueueSnackbar } = useSnackbar()

  const [currentTab, setCurrentTab] = useState('profile')
  const { themeStretch } = useSettingsContext()
  const [uploadCoverOrgImage] = useUpdateOrgCoverMutation()
  const { data, isLoading } = useGetOrganizationQuery()

  const onUpload = async (data: File): Promise<void> => {
    try {
      const file = new FormData()
      file.append('file', data)
      await uploadCoverOrgImage({ file }).unwrap()
      enqueueSnackbar(translate('messages_img_updated'))
    } catch (error: any) {
      enqueueSnackbar(translate('messages_img_not_updated'), {
        variant: 'error',
      })
    }
  }

  const TABS = [
    {
      value: 'profile',
      label: 'profile',
      icon: <RiAccountBoxFill />,
      component: <UserProfileTab />,
    },
    {
      value: 'settings',
      label: 'settings',
      icon: <MdSettingsApplications />,
      component: <SettingsTab />,
    },
    {
      value: 'customization',
      label: 'customization',
      icon: <MdDashboardCustomize />,
      component: <CustomizationTab />,
    },
    {
      value: 'contacts',
      label: 'Contacts',
      icon: <MdOutlineContacts />,
      component: <ContactsTab />,
    },
  ]

  if (isLoading) {
    return (
      <>
        <SkeletonSchool />
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <SkeletonProfileOrg />
        </Container>
      </>
    )
  }
  return (
    <>
      <Head>
        <title>{translate('organization')}| CodeTribe</title>
      </Head>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Card
          sx={{
            mb: 3,
            height: 280,
            position: 'relative',
          }}
        >
          <Stack
            sx={{
              position: 'absolute',
              right: 0,
              zIndex: 10,
              mt: '10px',
              mr: '10px',
            }}
          >
            <UploadImageModal onUpload={onUpload} />
          </Stack>
          <ProfileCover
            name={data?.title ?? ''}
            cover={data?.cover}
            avatar={data?.avatar}
            email={data?.email}
          />
          <Tabs
            value={currentTab}
            onChange={(event, newValue) => {
              setCurrentTab(newValue)
            }}
            sx={{
              width: 1,
              bottom: 0,
              zIndex: 9,
              position: 'absolute',
              bgcolor: 'background.paper',
              '& .MuiTabs-flexContainer': {
                pr: { xs: 0, md: 3 },
                pl: { xs: 2, md: 0 },
                justifyContent: {
                  sm: 'center',
                  md: 'flex-end',
                },
              },
            }}
          >
            {TABS.map((tab) => (
              <Tab
                key={tab.value}
                value={tab.value}
                icon={tab.icon}
                label={translate(tab.label)}
              />
            ))}
          </Tabs>
        </Card>

        {TABS.map(
          (tab) => tab.value === currentTab && <Box key={tab.value}> {tab.component} </Box>
        )}
      </Container>
    </>
  )
}
