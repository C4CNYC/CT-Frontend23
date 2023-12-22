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

import { useTranslate } from "src/utils/translateHelper";

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
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const translate = useTranslate();

  return (
    <Stack
      sx={{
        flexDirection: {
          xs: "column",
          sm: "column",
          md: "row",
          lg: "column",
          xl: "column",
        },
        width: { lg: "250px", xl: "300px" },
        gap: 3,
        flexShrink: 0,
        flexGrow: 0,
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
          <GrOverview size={25} /> {translate("courses_course_overview")}
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
          <IoImageOutline size={25} />{" "}
          {translate("courses_course_who_is_this_for")}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {translate("courses_entery_point")}
        </Typography>
        <Typography variant="body1">
          {translate("courses_for_beginners_info")}
        </Typography>
        <Typography
          variant="caption"
          sx={{ display: "flex", alignItems: "center", gap: 1, mt: 3 }}
        >
          <TbFileCertificate size={20} />{" "}
          {translate("courses_semple_cerificate")}
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
          <IoImageOutline size={25} /> {translate("courses_for_teachers")}
        </Typography>
        <Typography variant="body1" mb={3}>
          {translate("courses_for_teachers_info")}
        </Typography>
        <Link href="#" component={NextLink} color="inherit" underline="always">
          {translate("courses_pacing_guides_link")}
        </Link>
        <Link href="#" component={NextLink} color="inherit" underline="always">
          {translate("courses_standards_alignment_link")}
        </Link>
      </Stack>
    </Stack>
  );
}
