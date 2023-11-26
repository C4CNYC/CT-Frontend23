import NextLink from "next/link";

import { useRouter } from "next/router";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";

import { GrOverview } from "react-icons/gr";

import { Link, Paper, Stack, useTheme } from "@mui/material";

import RoleBasedGuard from "src/auth/RoleBasedGuard";
import { Role } from "src/redux/services/enums/role.enum";

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

  const { query } = useRouter();

  return (
    <RoleBasedGuard roles={[Role.Manager, Role.Admin, Role.Owner, Role.Editor]}>
      <Paper elevation={5} sx={{ borderRadius: 3, bgcolor: theme.palette.mode === "light" ? "#F8F8F8" : theme.palette.background.paper }}>
        <Stack p={2} gap={1}>
          {teacherForum && <Link
            target="_blank"
            rel="noopener noreferrer"
            href={teacherForum}
            component={NextLink}
            underline="always"
            color="inherit"
          >
            Module Slides
          </Link>}
          {lessonPlans && <Link
            target="_blank"
            rel="noopener noreferrer"
            href={lessonPlans}
            component={NextLink}
            underline="always"
            color="inherit"
          >
            Lesson Plans
          </Link>}
          {teacherSlides && <Link
            target="_blank"
            rel="noopener noreferrer"
            href={teacherSlides}
            component={NextLink}
            underline="always"
            color="inherit"
          >
            Teachers Forum
          </Link>}
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
            Course Overview
          </Link>
        </Stack>
      </Paper>
    </RoleBasedGuard>
  );
}
