import NextLink from "next/link";

import { AiOutlineClockCircle } from "react-icons/ai";
import { GrOverview } from "react-icons/gr";
import { IoImageOutline } from "react-icons/io5";
import { LuSchool } from "react-icons/lu";
import { MdOutlinePlayLesson } from "react-icons/md";
import { SiLevelsdotfyi } from "react-icons/si";
import { TbFileCertificate } from "react-icons/tb";

import {
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material";

interface ICourseSidebarPros {
  duration: string;
  level: string;
  lessons: number;
  grade: string;
}

export default function CourseSidebar({
  duration,
  lessons,
  level,
  grade,
}: ICourseSidebarPros): React.ReactElement {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("xl"));

  return (
    <Stack
      sx={{
        flexDirection: {
          xs: "column",
          sm: "column",
          md: "row",
          lg: "row",
          xl: "column",
        },
        width: { xl: "300px" },
        gap: 3,
        flexShrink: 0,
      }}
    >
      <Stack
        sx={{
          borderRadius: 1,
          background:
            theme.palette.mode === "light"
              ? "rgba(248, 248, 248, 1)"
              : theme.palette.background.neutral,
          p: 2,
          flex: isDesktop ? "0" : "1 0",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            display: "flex",
            alignItems: "center",
            fontWeight: 400,
            gap: 2,
          }}
        >
          <GrOverview size={25} /> Course Overview
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <AiOutlineClockCircle size={20} />
            </ListItemIcon>
            <ListItemText primary={`${duration} Hr`} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <SiLevelsdotfyi size={20} />
            </ListItemIcon>
            <ListItemText primary={level} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <MdOutlinePlayLesson size={20} />
            </ListItemIcon>
            <ListItemText primary={`${lessons} Hr`} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <LuSchool size={20} />
            </ListItemIcon>
            <ListItemText primary={grade} />
          </ListItem>
        </List>
      </Stack>
      <Stack
        sx={{
          borderRadius: 1,
          background:
            theme.palette.mode === "light"
              ? "rgba(248, 248, 248, 1)"
              : theme.palette.background.neutral,
          p: 2,
          flex: isDesktop ? "0" : "1 0",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            display: "flex",
            alignItems: "center",
            fontWeight: 400,
            gap: 2,
          }}
        >
          <IoImageOutline size={25} /> Who is this for
        </Typography>
        <Typography variant="body1" gutterBottom>
          A fantastic entry-point for understanding....
        </Typography>
        <Typography variant="body1">
          For curious beginners who want to understand the basics of web dev and
          who.
        </Typography>
        <Typography
          variant="caption"
          sx={{ display: "flex", alignItems: "center", gap: 1, mt: 3 }}
        >
          <TbFileCertificate size={20} /> Sample Certificate
        </Typography>
      </Stack>
      <Stack
        sx={{
          borderRadius: 1,
          background:
            theme.palette.mode === "light"
              ? "rgba(248, 248, 248, 1)"
              : theme.palette.background.neutral,
          p: 2,
          flex: isDesktop ? "0 0" : "1 0",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            display: "flex",
            alignItems: "center",
            fontWeight: 400,
            gap: 2,
          }}
        >
          <IoImageOutline size={25} /> For Teachers
        </Typography>
        <Typography variant="body1" mb={3}>
          A “Teacher Toolbox” is found within each module with all the resources
          you will need.
        </Typography>
        <Link href="#" component={NextLink} color="inherit" underline="always">
          Pacing Guides
        </Link>
        <Link href="#" component={NextLink} color="inherit" underline="always">
          Standards Alignment
        </Link>
      </Stack>
    </Stack>
  );
}
