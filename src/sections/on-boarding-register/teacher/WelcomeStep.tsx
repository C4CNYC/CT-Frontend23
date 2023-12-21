import { Button, Stack, Typography } from "@mui/material";

import { SessionType } from "./SessionType";
import {
  LAUNCH_SESSION_BTN_SX,
  POPUP_SESION_BTN_SX,
  WELCOM_STEP_SUBTITLE_SX,
  WELCOM_STEP_WRAPPER_SX,
} from "./constants";

export default function WelcomeStep({
  nextStep,
}: {
  nextStep: () => void;
}): React.ReactElement {
  return (
    <>
      <Stack direction="row" sx={WELCOM_STEP_WRAPPER_SX}>
        <Typography variant="h3">Hey, Teachers</Typography>
        <Typography variant="h3" sx={{ ml: 1 }}>
          👋
        </Typography>
      </Stack>
      <Typography variant="body1" sx={WELCOM_STEP_SUBTITLE_SX}>
        Let’s start a learning adventure
      </Typography>
      <Button disabled={true} onClick={() => {}} sx={POPUP_SESION_BTN_SX}>
        <SessionType {...POPUP_SESSION} disabled={true} />
      </Button>
      <Button
        onClick={() => {
          nextStep();
        }}
        sx={LAUNCH_SESSION_BTN_SX}
      >
        <SessionType {...LAUNCH_SESSION} />
      </Button>
    </>
  );
}

const POPUP_SESSION = {
  title: "Pop-up Session",
  subtitle:
    "Real-time view of all participants while broadcasting code & voice.",
  info: "Real-time view of all participants while broadcasting code & voice.",
  img: "/assets/on-boarding/live.svg",
  color: "#43D4DD33",
};
const LAUNCH_SESSION = {
  title: "Launch Course",
  subtitle: "Teacher-led or self-paced modules assigned to class or group.",
  info: "Real-time view of all participants while broadcasting code & voice.",
  img: "/assets/on-boarding/course.svg",
  color: "#EE467A33",
};
