import { CustomBreadcrumbs, useSettingsContext } from "@components";
import { SchoolDashboardLayout } from "@layouts/dashboard";
import { Container } from "@mui/material";
import { PATH_DASHBOARD } from "@routes/paths";
import TribeEditForm from "@sections/main/edit/TribeEditForm";
import Head from "next/head";

EditTribePage.getLayout = (page: React.ReactElement) => (
  <SchoolDashboardLayout>{page}</SchoolDashboardLayout>
);

export default function EditTribePage(): React.ReactElement {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title>Edit tribe | CodeTribe</title>
      </Head>

      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="Edit tribe"
          links={[
            {
              name: "Home",
              href: PATH_DASHBOARD.home.root,
            },
            { name: "Edit" },
          ]}
        />
        <TribeEditForm />
      </Container>
    </>
  );
}
