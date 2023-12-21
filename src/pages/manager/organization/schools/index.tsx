import Head from "next/head";

import { Container } from "@mui/material";

import { CustomBreadcrumbs, useSettingsContext } from "@components";
import DashboardLayout from "@layouts/dashboard";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import AddSchoolDialog from "@sections/dashboard/schools/portal/AddSchoolDialog";
import SchoolTable from "@sections/dashboard/schools/view/SchoolTable";
import { useLocales } from "src/locales";

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
          heading={""}
          links={[
            { name: "Home", href: STUDENT_PATH_DASHBOARD.class.root },
            { name: `${translate("organizations.schools_page.title")}` },
          ]}
          action={<AddSchoolDialog />}
        />
        <SchoolTable />
      </Container>
    </>
  );
}
