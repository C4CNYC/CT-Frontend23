import { useAtom } from "jotai";
import nextLink from "next/link";
import { StepWizardChildProps } from "react-step-wizard";

import { 
  Link, 
  Stack, 
  Button, 
  Typography,
 } from "@mui/material";

import { roadAtom } from "../road-atom";
import { PATH_AUTH } from "@routes/paths";
import { SessionType } from "./SessionType";
import StepContainer from "../StepContainer";

function HelloStep({
  nextStep,
  goToStep,
}: Partial<StepWizardChildProps>): React.ReactElement {
  const [, setSessionWay] = useAtom(roadAtom);
  return (
    <StepContainer>
      <Stack>
        <Stack
          direction="row"
          sx={{ alignItems: "flse-start", ml: { xs: 3, sm: 3, md: 0 } }}
        >
          <Typography variant="h3">Hi,</Typography>
          <Typography variant="h3">👋</Typography>
        </Stack>
        <Typography variant="body1" sx={{ pb: 3, ml: { xs: 3, sm: 3, md: 0 } }}>
          Let’s start a learning adventure
        </Typography>
        <Button
          onClick={() => {
            nextStep?.();
            setSessionWay({ sessionWay: true });
          }}
          sx={{ color: "inherit", py: 2, mb: 1, borderRadius: "15px" }}
        >
          <SessionType {...POPUP_SESSION} />
        </Button>
        <Button
          onClick={() => {
            goToStep?.(3);
            setSessionWay({ sessionWay: false });
          }}
          sx={{ color: "inherit", py: 2, borderRadius: "15px" }}
        >
          <SessionType {...LAUNCH_SESSION} />
        </Button>
        <Typography variant="body1" sx={{ color: "#616161" }}>
          <Link
            component={nextLink}
            href={PATH_AUTH.register}
            sx={{
              color: "#616161",
              textDecoration: "underline",
              ml: 2,
              my: 4,
              display: "inline-block",
            }}
          >
            Register my school
          </Link>{" "}
          instead.
        </Typography>
      </Stack>
    </StepContainer>
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
export default HelloStep;
