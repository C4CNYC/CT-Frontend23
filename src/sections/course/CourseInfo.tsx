import { Button, Stack, Typography, styled } from "@mui/material";

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
      sx={{
        flexDirection: {
          xs: "column-reverse",
          sm: "column-reverse",
          md: "row",
        },
        justifyContent: "space-between",
        px: 8,
        py: 4,
        mb: 5,
        background: "#ECF4FF",
        borderRadius: 2,
      }}
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
        {/* <RoundedGradientButton variant="contained">
          Get Coding
          <svg width="0" height="0">
            <linearGradient
              id="blue-gradient"
              x1="100%"
              y1="100%"
              x2="0%"
              y2="0%"
            >
              <stop stopColor="#61F3F3" offset="0%" />
              <stop stopColor="#00B8D9" offset="100%" />
            </linearGradient>
          </svg>
          <IoChevronForward
            size={25}
            style={{ stroke: "url(#blue-gradient)" }}
          />
        </RoundedGradientButton> */}
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

const RoundedGradientButton = styled(Button)(() => ({
  position: "relative",
  border: "3px solid transparent",
  backgroundClip: "padding-box",
  borderRadius: "50px",
  maxWidth: "300px",
  fontSize: "1.2rem",
  gap: 4,
  zIndex: 2,
  background: "-webkit-linear-gradient(150deg,#61F3F3,#00B8D9)",
  "-webkit-background-clip": "text",
  "-webkit-text-fill-color": "transparent",
  "&:hover": {
    boxShadow:
      "0px 3px 1px -2px rgba(97, 243, 243, .3), 0px 2px 2px 0px rgba(97, 243, 243, .3), 0px 1px 5px 0px rgba(97, 243, 243, .3)",
  },
  "&:after": {
    content: '" "',
    position: "absolute",
    inset: 0,
    top: -3,
    left: -3,
    right: -3,
    bottom: -3,
    borderRadius: "50px",
    padding: "3px",
    background: "linear-gradient(150deg,#61F3F3,#00B8D9)",
    "-webkit-mask":
      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0) ",
    "-webkit-mask-composite": "xor",
    "mask-composite": "exclude",
  },
}));
