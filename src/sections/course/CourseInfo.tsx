import { Stack, Typography } from "@mui/material";

import { Image } from "@components";

import CourseSummarily from "./CourseSummarily.1";

interface ICourseInfoProps {
  cover?: string;
  name: string;
  description: string;
  lessonsCount: number;
  duration: string;
  level: string;
}

export default function CourseInfo({
  cover,
  name,
  description,
  duration,
  lessonsCount,
  level,
}: ICourseInfoProps): React.ReactElement {
  return (
    <Stack
      sx={(theme) => ({
        flexDirection: {
          xs: "column-reverse",
          sm: "column-reverse",
          md: "row",
        },
        justifyContent: "space-between",
        px: 8,
        py: 4,
        mb: 5,
        background:
          theme.palette.mode === "light"
            ? "#ECF4FF"
            : theme.palette.background.paper,
        borderRadius: 2,
        [theme.breakpoints.down(800)]: {
          px: 2,
          py: 3,
          mb: 3,
        },
      })}
    >
      <Stack maxWidth="680px">
        <Typography variant="h3" pb={2}>
          {name}
        </Typography>
        <Typography variant="subtitle1" fontWeight={400} pb={3}>
          {description}
        </Typography>
        <CourseSummarily
          duration={duration}
          lessonsCount={lessonsCount}
          level={level}
        />
      </Stack>
      <Image
        alt="course cover"
        src={cover ?? "/assets/courses/courseImg.png"}
        sx={{
          flexShrink: 0,
          width: "250px",
          height: "250px",
          m: "0 auto",
          borderRadius: "25px",
        }}
      />
    </Stack>
  );
}
