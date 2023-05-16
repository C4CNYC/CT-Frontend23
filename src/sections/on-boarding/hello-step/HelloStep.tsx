import { Link, Stack, Typography } from "@mui/material";
import { PATH_AUTH } from "@routes/paths";
import nextLink from "next/link";
import StepContainer from "../StepContainer";
import { SessionType } from "./SessionType";

export enum ISessionType {
  popup = "popup",
  course = "course",
}

export default function HelloStep(): React.ReactElement {
  return (
    <StepContainer>
      <Stack direction="row" sx={{ alignItems: "baseline", mb: -2 }}>
        <Typography variant="h3">Hi,</Typography>
        <Typography variant="h3">👋</Typography>
      </Stack>
      <Typography variant="body1" sx={{ display: "inline-flex", pb: 1 }}>
        Let’s start a learning adventure
      </Typography>
      <SessionType {...POPUP_SESSION} />
      <SessionType {...LAUNCH_SESSION} />
      <Typography variant="body1" sx={{ color: "#616161" }}>
        <Link
          component={nextLink}
          href={PATH_AUTH.register}
          sx={{
            color: "#616161",
            textDecoration: "underline",
            ml: 2,
            my: 2,
            display: "inline-block",
          }}
        >
          Register my school
        </Link>{" "}
        instead.
      </Typography>
    </StepContainer>
  );
}

const POPUP_SESSION = {
  type: ISessionType.popup,
  title: "Pop-up Session",
  subtitle:
    "Real-time view of all participants while broadcasting code & voice.",
  info: "Real-time view of all participants while broadcasting code & voice.",
  img: "/assets/on-boarding/live.svg",
  color: "#43D4DD33",
};
const LAUNCH_SESSION = {
  type: ISessionType.course,
  title: "Launch Course",
  subtitle: "Teacher-led or self-paced modules assigned to class or group.",
  info: "Real-time view of all participants while broadcasting code & voice.",
  img: "/assets/on-boarding/course.svg",
  color: "#EE467A33",
};
