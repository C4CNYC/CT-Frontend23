import { useState } from 'react'

import { Box, Card, Container, Stack, Tab, Tabs, useTheme } from '@mui/material'
import { BsPeopleFill } from '@react-icons/all-files/bs/BsPeopleFill'
import { MdContacts } from '@react-icons/all-files/md/MdContacts'
import Head from 'next/head'
import { useSnackbar } from 'notistack'
import { useSelector } from 'react-redux'

import { Iconify, UploadImageModal, useSettingsContext } from '@/components'
import { SchoolDashboardLayout } from '@/layouts/dashboard/SchoolDashboardLayout'
import {
  useGetSchoolProfileQuery,
  useUpdateSchoolCoverImgMutation,
} from '@/redux/services/manager/schools-manager'
import { RootState } from '@/redux/store'
import { ProfileCover } from '@/sections/dashboard/user/profile'
import SkeletonSchool from '@/sections/schools/skeleton-school'
import {
  SchoolContactsTab,
  SchoolProfileTab,
  SchoolSettingsTab,
  SchoolSocialsTab,
} from '@/sections/schools/tabs'
import SkeletonProfileTab from '@/sections/schools/tabs/profile/SkeletomProfileTab'
import { useTranslate } from '@/utils/translateHelper'

UserProfilePage.getLayout = (page: React.ReactElement) => (
  <SchoolDashboardLayout>{page}</SchoolDashboardLayout>
)

export default function UserProfilePage(): React.ReactElement {
  const schoolId = useSelector((state: RootState) => state.manager.schoolId)
  const translate = useTranslate()
  const theme = useTheme()
  const [currentTab, setCurrentTab] = useState('profile')
  const { themeStretch } = useSettingsContext()
  const { data, isLoading, isFetching } = useGetSchoolProfileQuery(
    { schoolId },
    { skip: !schoolId }
  )

  const isRTL = theme.direction === 'rtl'

  const TABS = [
    {
      value: 'profile',
      label: 'general',
      icon: (
        <Iconify
          icon='ic:round-account-box'
          sx={{ ...(isRTL && { ml: 1 }) }}
        />
      ),
      component: <SchoolProfileTab schoolId={schoolId} />,
    },
    {
      value: 'settings',
      label: 'settings',
      icon: (
        <Iconify
          icon='ic:baseline-settings-applications'
          sx={{ ...(isRTL && { ml: 1 }) }}
        />
      ),
      component: <SchoolSettingsTab schoolId={schoolId} />,
    },
    {
      value: 'contacts',
      label: 'contacts',
      icon: <MdContacts style={{ marginLeft: isRTL ? '8px' : 0 }} />,
      component: <SchoolContactsTab schoolId={schoolId} />,
    },
    {
      value: 'socials',
      label: 'social_networks',
      icon: <BsPeopleFill style={{ marginLeft: isRTL ? '8px' : 0 }} />,
      component: <SchoolSocialsTab schoolId={schoolId} />,
    },
  ]

  const { enqueueSnackbar } = useSnackbar()

  const [updateSchoolCoverImage] = useUpdateSchoolCoverImgMutation()

  const onUpload = async (data: File, id: string | undefined): Promise<void> => {
    try {
      const file = new FormData()
      file.append('file', data)
      if (!id) {
        return
      } else {
        await updateSchoolCoverImage({ id, file }).unwrap()
      }
      enqueueSnackbar(translate('messages_img_updated'))
    } catch (error: any) {
      enqueueSnackbar(translate('messages_img_not_updated'), {
        variant: 'error',
      })
    }
  }

  if (isLoading || isFetching) {
    return (
      <>
        <SkeletonSchool />
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <SkeletonProfileTab />
        </Container>
      </>
    )
  }

  return (
    <>
      <Head>
        <title> {translate('organization')} | CodeTribe </title>
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
            <UploadImageModal
              onUpload={onUpload}
              id={schoolId}
            />
          </Stack>
          <ProfileCover
            name={data?.name ?? ''}
            avatar={data?.avatar}
            cover={data?.cover}
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
                ...(!isRTL && { pr: { xs: 0, md: 3 }, pl: { xs: 2, md: 0 } }),
                ...(isRTL && { pl: { xs: 0, md: 3 }, pr: { xs: 2, md: 0 }, gap: 1 }),
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
