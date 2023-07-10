
import Head from "next/head";

import { Container } from "@mui/material";

import { useSettingsContext, CustomBreadcrumbs } from "@components";

import { useLocales } from "src/locales";
import DashboardLayout from "@layouts/dashboard";
import { MANAGER_PATH_DASHBOARD } from "@routes/manager.paths";
import SchoolTable from "@sections/dashboard/schools/view/SchoolTable";
import AddSchoolDialog from "@sections/dashboard/schools/portal/AddSchoolDialog";

Index.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default function Index(): React.ReactElement {
  const { translate } = useLocales();

  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title> {`${translate("organizations.title")} | CodeTribe`}</title>
      </Head>
      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading={`${translate("organizations.schools_page.title")}`}
          links={[
            {
              name: `${translate("organizations.schools_page.title")}`,
              href: MANAGER_PATH_DASHBOARD.root,
            },
            { name: `${translate("organizations.schools_page.title")}` },
          ]}
          action={<AddSchoolDialog />}
        />
        <SchoolTable />
      </Container>
    </>
  );
}
