import { useState } from "react";

import { IoChevronDown, IoChevronForward, IoChevronUp } from "react-icons/io5";

import { Button, Collapse, Stack, Typography, styled } from "@mui/material";

import { Image } from "@components";
import RoleBasedGuard from "src/auth/RoleBasedGuard";
import { Role } from "src/redux/services/enums/role.enum";

import CourseSummarily from "./CourseSummarily";

interface ICourseInfoProps {
  cover?: string;
  name: string;
  description: string;
  lessonsCount: number;
  duration: string;
  level: string;
}

const MAX_DESCRIPTION_LENGTH = 200;

export default function CourseInfo({
  cover,
  name,
  description,
  duration,
  lessonsCount,
  level,
}: ICourseInfoProps): React.ReactElement {
  const [openDetails, setOpenDetails] = useState(false);

  return (
    <Stack
      sx={{
        flexDirection: {
          xs: "column-reverse",
          sm: "column-reverse",
          md: "row",
        },
        justifyContent: "space-between",
        pr: { xs: 0, sm: 0, md: "50px", lg: "150px" },
        gap: 2,
      }}
    >
      <Stack maxWidth="680px">
        <Typography variant="h4">{name}</Typography>
        <Typography variant="h6" fontWeight={400} gutterBottom>
          {description.length > MAX_DESCRIPTION_LENGTH && !openDetails
            ? `${description.slice(0, MAX_DESCRIPTION_LENGTH)}... `
            : description}
        </Typography>
        <Collapse in={openDetails}>
          <RoleBasedGuard
            roles={[Role.Owner, Role.Manager, Role.Admin, Role.Editor]}
          >
            <Typography variant="caption" fontStyle="italic">
              Teachers: Open a module and scroll down to see Teacher Toolbox.
            </Typography>
          </RoleBasedGuard>
          <CourseSummarily
            duration={duration}
            lessonsCount={lessonsCount}
            level={level}
          />
        </Collapse>
        <Button
          variant="text"
          onClick={() => {
            setOpenDetails(!openDetails);
          }}
          disableRipple
          sx={{
            gap: 2,
            color: "inherit",
            alignSelf: "flex-start",
            p: 0,
            mb: 4,
            "&:hover": {
              background: "none",
            },
          }}
        >
          <Typography variant="h6" fontWeight={400}>
            See more
          </Typography>
          {!openDetails ? (
            <IoChevronDown size={22} />
          ) : (
            <IoChevronUp size={22} />
          )}
        </Button>

        <RoundedGradientButton variant="contained">
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
        </RoundedGradientButton>
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
