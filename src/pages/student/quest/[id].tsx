import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";

import {
  Container,
  Link,
  Skeleton,
  SxProps,
  Theme,
  useTheme,
} from "@mui/material";

import { Iconify, useSettingsContext } from "@components";
import { StudentDashboardLayout } from "@layouts/dashboard";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import QuestDescription from "@sections/quest/QuestDescription";
import QuestHeader from "@sections/quest/QuestHeader";
import QuestMain from "@sections/quest/QuestMain";
import QuestRating from "@sections/quest/QuestRating";
import { useGetAssignmentStudentQuery } from "src/redux/services/manager/assignments-student";
import { useGetCoursQuery } from "src/redux/services/manager/courses-student";
import { useTranslate } from "src/utils/translateHelper";

Quest.getLayout = (page: React.ReactElement) => (
  <StudentDashboardLayout>{page}</StudentDashboardLayout>
);

export default function Quest(): React.ReactElement | null {
  const { query } = useRouter();
  const theme = useTheme();
  const { themeStretch } = useSettingsContext();
  const containerSx = useMemo(() => getContainerSx(theme), [theme]);
  const skeletonSx = useMemo(() => getSkeletonSx(theme), [theme]);
  const { data, isLoading } = useGetAssignmentStudentQuery(
    { assignmentId: query.id as string },
    { skip: !query.id }
  );
  const translate = useTranslate();

  const { data: course, isLoading: isLoadingCourse } = useGetCoursQuery(
    { id: data?.course.id as string },
    { skip: !data?.course.id }
  );

  if (isLoading || !data) {
    return <Skeleton variant="rounded" height="600px" />;
  }

  return (
    <>
      <Head>
        <title>{translate("quest")} | CodeTribe</title>
      </Head>
      <Container maxWidth={themeStretch ? false : "lg"} sx={containerSx}>
        <QuestHeader />
        <QuestMain questName={data.name} />
        <QuestDescription description={data?.description} />
        {isLoadingCourse ? (
          <Skeleton variant="rounded" sx={skeletonSx} />
        ) : (
          <QuestRating
            courseId={course?.id ?? ""}
            courseName={course?.name ?? ""}
            progress={course?.progress ?? 0}
          />
        )}
        <Link
          component={NextLink}
          href={STUDENT_PATH_DASHBOARD.codePanel.workSpace(course?.id ?? "")}
          underline="none"
          sx={KEEP_CODING_LINK_SX}
        >
          {translate("keep_coding")}
          <Iconify icon="maki:arrow" width={18} style={{ marginLeft: "3px" }} />
        </Link>
      </Container>
    </>
  );
}

export const getContainerSx = (theme: Theme): SxProps => ({
  borderRadius: 1,
  background:
    theme.palette.mode === "light"
      ? "rgba(243, 243, 243, 0.8)"
      : theme.palette.background.paper,
  pt: 2,
  pb: 8,
});

export const getSkeletonSx = (theme: Theme): SxProps => ({
  height: "98px",
  mt: 3,
  background: theme.palette.mode === "light" ? "#fff" : "initial",
  borderRadius: 2,
});

export const KEEP_CODING_LINK_SX = {
  display: "inline-flex",
  alignItems: "center",
  color: "inherit",
  mt: 2,
  pl: 2,
};
