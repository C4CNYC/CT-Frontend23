import { useSettingsContext, CustomBreadcrumbs } from "@ct-nx/components";
import DashboardLayout from "@layouts/dashboard";
import { Container } from "@mui/material";
import { PATH_DASHBOARD } from "@routes/paths";
import Head from "next/head";

import AddSchoolDialog from "@sections/dashboard/schools/portal/AddSchoolDialog";
import SchoolTable from "@sections/dashboard/schools/view/SchoolTable";
import { useLocales } from "src/locales";

Index.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

// ----------------------------------------------------------------------

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
              href: PATH_DASHBOARD.root,
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
