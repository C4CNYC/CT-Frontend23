import { Button } from '@mui/material'
import { Container } from '@mui/system'
import Head from 'next/head'

import { useSettingsContext } from '@/components'
import JoinLinkModal from '@/components/join-link-modal'
import { StudentDashboardLayout } from '@/layouts/dashboard'

InviteModal.getLayout = (page: React.ReactElement) => (
  <StudentDashboardLayout>{page}</StudentDashboardLayout>
)

export default function InviteModal() {
  const { themeStretch } = useSettingsContext()

  return (
    <>
      <Head>
        <title>Invite | CodeTribe</title>
      </Head>
      <Container
        maxWidth={themeStretch ? false : 'lg'}
        disableGutters
      >
        <JoinLinkModal>
          <Button>Invite</Button>
        </JoinLinkModal>
      </Container>
    </>
  )
}
