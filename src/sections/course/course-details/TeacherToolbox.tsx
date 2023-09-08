import NextLink from "next/link";
import { useState } from "react";

import { FaChevronDown } from "react-icons/fa";
import { GrOverview } from "react-icons/gr";

import {
  Button,
  Collapse,
  Link,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import RoleBasedGuard from "src/auth/RoleBasedGuard";
import { Role } from "src/redux/services/enums/role.enum";

export default function TeacherToolbox(): React.ReactElement {
  const [openToolbox, setOpenToolbox] = useState(false);

  return (
    <RoleBasedGuard roles={[Role.Manager, Role.Admin, Role.Owner, Role.Editor]}>
      <Paper
        elevation={5}
        sx={{ borderRadius: 3, bgcolor: "#F8F8F8", py: 1, px: 2, mt: 2 }}
      >
        <Button
          onClick={() => {
            setOpenToolbox(!openToolbox);
          }}
          disableRipple
          sx={{
            color: "inherit",
            gap: 2,
            "&:hover": {
              background: "none",
            },
          }}
        >
          <Typography variant="h6" fontWeight={400} whiteSpace="nowrap">
            TEACHER TOOLBOX
          </Typography>
          <FaChevronDown size={22} />
        </Button>
        <Collapse in={openToolbox}>
          <Stack pl={2} gap={1}>
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
        </Collapse>
      </Paper>
    </RoleBasedGuard>
  );
}
