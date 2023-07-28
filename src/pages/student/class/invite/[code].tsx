import Head from "next/head";

import { Container } from "@mui/system";
import { useSettingsContext } from "@components";
import JoinLinkModal from "src/components/join-link-modal";
import { Button } from "@mui/material";
import { StudentDashboardLayout } from "@layouts/dashboard";

InviteModal.getLayout = (page: React.ReactElement) => (
  <StudentDashboardLayout>{page}</StudentDashboardLayout>
);

export default function InviteModal() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title>Invite | CodeTribe</title>
      </Head>
      <Container
        maxWidth={themeStretch ? false : "lg"}
        disableGutters
      >
        <JoinLinkModal>
          <Button>Invite</Button>
        </JoinLinkModal>
      </Container>
    </>
  );
}
