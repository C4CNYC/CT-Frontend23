import Head from "next/head";
import { useRouter } from "next/router";

import { useSelector } from "react-redux";

import { Container } from "@mui/material";

import { CustomBreadcrumbs, useSettingsContext } from "@components";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import SkeletonEditUserForm from "@sections/dashboard/user/skeleton/SkeletonEditUserForm";
import { SchoolDashboardLayout } from "src/layouts/dashboard/SchoolDashboardLayout";
import { useGetStudentQuery } from "src/redux/services/manager/students-manager";
import { RootState } from "src/redux/store";
import StudentNewEditForm from "src/sections/dashboard/student/StudentNewEditForm";

UserEditPage.getLayout = (page: React.ReactElement) => (
  <SchoolDashboardLayout>{page}</SchoolDashboardLayout>
);

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

  console.log(data);

  return (
    <>
      <Head>
        <title> Student: Edit student | CodeTribe</title>
      </Head>

      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading=""
          links={[
            { name: "Home", href: STUDENT_PATH_DASHBOARD.class.root },
            { name: data?.account?.email },
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
