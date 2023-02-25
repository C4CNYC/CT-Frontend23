import Head from "next/head";
import { useRouter } from "next/router";
// @mui
import CustomBreadcrumbs from "@components/custom-breadcrumbs";
import { useSettingsContext } from "@components/settings";
import { Container } from "@mui/material";
import { useSelector } from "react-redux";
import SchoolDashboardLayout from "src/layouts/dashboard/SchoolDashboardLayout";
import { useGetStudentQuery } from "src/redux/services/manager";
import { RootState } from "src/redux/store";
import { PATH_DASHBOARD } from "src/routes/paths";
import StudentNewEditForm from "src/sections/dashboard/student/StudentNewEditForm";

// ----------------------------------------------------------------------

UserEditPage.getLayout = (page: React.ReactElement) => (
  <SchoolDashboardLayout>{page}</SchoolDashboardLayout>
);

// ----------------------------------------------------------------------

export default function UserEditPage(): React.ReactElement {
  const {
    query: { id },
  } = useRouter();
  const { themeStretch } = useSettingsContext();
  const schoolId = useSelector((state: RootState) => state.manager.schoolId);

  const { data } = useGetStudentQuery(
    {
      studentId: id as string,
      schoolId,
    },
    { skip: !schoolId || !id }
  );

  return (
    <>
      <Head>
        <title> Student: Edit student | CodeTribe</title>
      </Head>

      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="Edit user"
          links={[
            {
              name: "Dashboard",
              href: PATH_DASHBOARD.root,
            },
            { name: data?.email },
          ]}
        />

        <StudentNewEditForm isEdit currentUser={data} />
      </Container>
    </>
  );
}
