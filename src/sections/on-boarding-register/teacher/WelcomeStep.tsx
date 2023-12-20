import { Button, Stack, Typography } from "@mui/material";

import { useTranslate } from "src/utils/translateHelper";

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
  const translate = useTranslate();

  return (
    <>
      <Stack direction="row" sx={WELCOM_STEP_WRAPPER_SX}>
        <Typography variant="h3">{translate("login_hey_teachers")}</Typography>
        <Typography variant="h3" sx={{ ml: 1 }}>
          👋
        </Typography>
      </Stack>
      <Typography variant="body1" sx={WELCOM_STEP_SUBTITLE_SX}>
        {translate("login_lets_start_learning")}
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
  title: "login_popup_session_title",
  subtitle: "login_popup_session_subtitle",
  info: "login_popup_session_info",
  img: "/assets/on-boarding/live.svg",
  color: "#43D4DD33",
};
const LAUNCH_SESSION = {
  title: "login_launch_session_title",
  subtitle: "login_launch_session_subtitle",
  info: "login_launch_session_info",
  img: "/assets/on-boarding/course.svg",
  color: "#EE467A33",
};
