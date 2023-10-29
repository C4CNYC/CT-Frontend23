import NextLink from "next/link";

import { GrOverview } from "react-icons/gr";

import { Link, Paper, Stack } from "@mui/material";

import RoleBasedGuard from "src/auth/RoleBasedGuard";
import { Role } from "src/redux/services/enums/role.enum";

export default function TeacherToolbox(): React.ReactElement {
  return (
    <RoleBasedGuard roles={[Role.Manager, Role.Admin, Role.Owner, Role.Editor]}>
      <Paper elevation={5} sx={{ borderRadius: 3, bgcolor: "#F8F8F8" }}>
        <Stack p={2} gap={1}>
          <Link
            href="#"
            component={NextLink}
            underline="always"
            color="inherit"
          >
            Module Slides
          </Link>
          <Link
            href="#"
            component={NextLink}
            underline="always"
            color="inherit"
          >
            Lesson Plans
          </Link>
          <Link
            href="#"
            component={NextLink}
            underline="always"
            color="inherit"
          >
            Teachers Forum
          </Link>
          <Link
            href="#"
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
