import CustomBreadcrumbs from "@components/custom-breadcrumbs/CustomBreadcrumbs";
import SchoolDashboardLayout from "@layouts/dashboard/SchoolDashboardLayout";
import { Container } from "@mui/material";
import { PATH_DASHBOARD } from "@routes/paths";
import { ProgressSection } from "@sections/dashboard/progress";

Progress.getLayout = (page: React.ReactElement) => (
  <SchoolDashboardLayout>{page}</SchoolDashboardLayout>
);

export default function Progress(): React.ReactElement {
  return (
    <>
      <Container sx={{ ml: 0 }}>
        <CustomBreadcrumbs
          heading="Progress"
          links={[
            {
              name: "Dashboard",
              href: PATH_DASHBOARD.root,
            },
            { name: "Progress", href: PATH_DASHBOARD.school.progress },
          ]}
        />
        <ProgressSection/>
      </Container>
    </>
  );
}
