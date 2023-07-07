import Head from "next/head";
import { useRouter } from "next/router";
// @mui
import { useSettingsContext, CustomBreadcrumbs } from "@components";
import { Container } from "@mui/material";
import SkeletonEditUserForm from "@sections/dashboard/user/skeleton/SkeletonEditUserForm";
import { useSelector } from "react-redux";
import SchoolDashboardLayout from "src/layouts/dashboard/SchoolDashboardLayout";
import { useGetStudentQuery } from "src/redux/services/manager/students-manager";
import { RootState } from "src/redux/store";
import StudentNewEditForm from "src/sections/dashboard/student/StudentNewEditForm";
import { MANAGER_PATH_DASHBOARD } from "@routes/manager.paths";

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

  const { data, isLoading } = useGetStudentQuery(
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
          heading="Edit student"
          links={[
            {
              name: "Dashboard",
              href: MANAGER_PATH_DASHBOARD.root,
            },
            { name: data?.email },
          ]}
        />
        {isLoading ? (
          <SkeletonEditUserForm />
        ) : (
          <StudentNewEditForm isEdit currentUser={data} />
        )}
      </Container>
    </>
  );
}
