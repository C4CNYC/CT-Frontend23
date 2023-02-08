import Head from "next/head";
import { useRouter } from "next/router";
// @mui
import { Container } from "@mui/material";
import CustomBreadcrumbs from "src/components/custom-breadcrumbs";
import { useSettingsContext } from "src/components/settings";
import DashboardLayout from "src/layouts/dashboard";
import { PATH_DASHBOARD } from "src/routes/paths";
import { _userList } from "src/_mock/arrays";
import StudentNewEditForm from "src/sections/@dashboard/student/StudentNewEditForm";
import { useGetStudentQuery } from "src/redux/services/manager";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";

// ----------------------------------------------------------------------

UserEditPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

// ----------------------------------------------------------------------

export default function UserEditPage() {
  const { query: { id } } = useRouter();
  const { themeStretch } = useSettingsContext();
  const school_id = useSelector((state: RootState) => state.manager.school_id);

  const { data } = useGetStudentQuery({
    student_id: id as string,
    school_id
  }, { skip: !school_id || !id });

  return (
    <>
      <Head>
        <title> User: Edit user | Minimal UI</title>
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
