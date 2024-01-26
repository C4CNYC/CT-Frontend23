import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

import {
  Container,
  Link,
  Skeleton,
  SxProps,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";

import { Iconify, useSettingsContext } from "@components";
import { StudentDashboardLayout } from "@layouts/dashboard";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import QuestDescription from "@sections/quest/QuestDescription";
import QuestHeader from "@sections/quest/QuestHeader";
import QuestMain from "@sections/quest/QuestMain";
import QuestRating from "@sections/quest/QuestRating";
import { useGetTeacherListQuery } from "src/redux/services/admin/school-amdin";
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
  const [hasContent, setHasContent] = useState(false);
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

  const { data: teachers } = useGetTeacherListQuery(
    {
      schoolId: query.schoolId as string,
    },
    { skip: !query.schoolId }
  );

  useEffect(() => {
    if (data) {
      const content = JSON.parse(data?.description as string).doc.content;
      setHasContent(content.some((el: any) => el.content));
    }
  }, [data]);

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
        <QuestMain teachers={teachers} questName={data.name} />
        {hasContent ? (
          <QuestDescription description={data?.description} />
        ) : (
          <Typography variant="h4" pt={3}>
            {translate("quest_no_descr")}
          </Typography>
        )}

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

const getContainerSx = (theme: Theme): SxProps => ({
  borderRadius: 1,
  background:
    theme.palette.mode === "light"
      ? "rgba(243, 243, 243, 0.8)"
      : theme.palette.background.paper,
  pt: 2,
  pb: 8,
});

const getSkeletonSx = (theme: Theme): SxProps => ({
  height: "98px",
  mt: 3,
  background: theme.palette.mode === "light" ? "#fff" : "initial",
  borderRadius: 2,
});

const KEEP_CODING_LINK_SX = {
  display: "inline-flex",
  alignItems: "center",
  color: "inherit",
  mt: 2,
  pl: 2,
};
