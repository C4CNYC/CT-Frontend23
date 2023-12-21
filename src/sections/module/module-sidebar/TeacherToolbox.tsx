import NextLink from "next/link";
import { useRouter } from "next/router";

import { GrOverview } from "react-icons/gr";

import { Link, Paper, Stack, useTheme } from "@mui/material";

import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import RoleBasedGuard from "src/auth/RoleBasedGuard";
import { Role } from "src/redux/services/enums/role.enum";
import { useTranslate } from "src/utils/translateHelper";

export default function TeacherToolbox({
  teacherForum,
  lessonPlans,
  teacherSlides,
}: {
  teacherForum?: string;
  lessonPlans?: string;
  teacherSlides?: string;
}): React.ReactElement {
  const theme = useTheme();
  const translate = useTranslate();

  const { query } = useRouter();

  return (
    <RoleBasedGuard roles={[Role.Manager, Role.Admin, Role.Owner, Role.Editor]}>
      <Paper
        elevation={5}
        sx={{
          borderRadius: 3,
          bgcolor:
            theme.palette.mode === "light"
              ? "#F8F8F8"
              : theme.palette.background.paper,
        }}
      >
        <Stack p={2} gap={1}>
          {teacherForum && (
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={teacherForum}
              component={NextLink}
              underline="always"
              color="inherit"
            >
              {translate("courses_module_slides")}
            </Link>
          )}
          {lessonPlans && (
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={lessonPlans}
              component={NextLink}
              underline="always"
              color="inherit"
            >
              {translate("courses_lesson_plans")}
            </Link>
          )}
          {teacherSlides && (
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={teacherSlides}
              component={NextLink}
              underline="always"
              color="inherit"
            >
              {translate("courses_teachers_forum")}
            </Link>
          )}
          <Link
            href={STUDENT_PATH_DASHBOARD.courses.course(query.id as string)}
            component={NextLink}
            underline="none"
            sx={{
              color: "inherit",
              display: "flex",
              gap: 1,
              alignItems: "center",
            }}
          >
            <GrOverview size={20} />
            {translate("courses_course_overview")}
          </Link>
        </Stack>
      </Paper>
    </RoleBasedGuard>
  );
}
