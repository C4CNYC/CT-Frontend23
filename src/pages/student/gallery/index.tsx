import { CustomBreadcrumbs, useSettingsContext } from "@components";

import { StudentDashboardLayout } from "@layouts/dashboard/StudentDashboardLayout";
import { Container, Grid, Link } from "@mui/material";
import { STUDENT_PATH_DASHBOARD, STUDENT_PATH_MAIN } from "@routes/student.paths";
import FolderElement from "@sections/dashboard/gallery/FolderElement";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { IGallery } from "src/redux/interfaces/gallary.interface";
import { useGetProjectsQuery } from "src/redux/services/student/gallery-student";

Gallery.getLayout = (page: React.ReactElement) => (
  <StudentDashboardLayout>{page}</StudentDashboardLayout>
);
interface IProjectCount {
  publicPr: number;
  privatePr: number;
}
export default function Gallery(): React.ReactElement {
  const [projectsCount, setProjectsCount] = useState<IProjectCount>({
    publicPr: 0,
    privatePr: 0,
  });
  const { themeStretch } = useSettingsContext();
  const { data } = useGetProjectsQuery({});

  useEffect(() => {
    if (data) {
      const publicCount = data.data.filter(
        (el: IGallery) => el.public === true
      ).length;
      setProjectsCount({
        publicPr: publicCount,
        privatePr: data.data.length - publicCount,
      });
    }
  }, [data]);

  return (
    <Container maxWidth={themeStretch ? false : "lg"}>
      <CustomBreadcrumbs
        heading="Gallery"
        links={[
          { name: "Dashboard", href: STUDENT_PATH_MAIN.index },
          { name: "Gallery", href: STUDENT_PATH_DASHBOARD.gallery.root },
        ]}
      />

      <Grid container spacing={5}>
        <Grid item xs={12} md={6}>
          <Link
            component={NextLink}
            href={STUDENT_PATH_DASHBOARD.gallery.publicProject}
            underline="none"
          >
            <FolderElement
              title="Public"
              subtitle="Anyone can see your projects."
              projectCout={projectsCount.publicPr}
            />
          </Link>
        </Grid>
        <Grid item xs={12} md={6}>
          <Link
            component={NextLink}
            href={STUDENT_PATH_DASHBOARD.gallery.privateProject}
            underline="none"
          >
            <FolderElement
              title="Private"
              subtitle="This folder is only for you"
              projectCout={projectsCount.privatePr}
            />
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
}
