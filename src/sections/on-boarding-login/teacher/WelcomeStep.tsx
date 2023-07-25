import { useAtom } from "jotai";
import { StepWizardChildProps } from "react-step-wizard";

import { Button, Stack, Typography } from "@mui/material";

import { SessionType } from "./SessionType";
import { teacherStepperAtom } from "./teacher-stepper-atom";

export default function WelcomeStep(): React.ReactElement {
  const [activeStep, setActiveStep] = useAtom(teacherStepperAtom);

  return (
    <>
      <Stack direction="row" sx={{ ml: { xs: 3, sm: 3, md: 0 }, mt: "60px" }}>
        <Typography variant="h3">Hey, Teachers</Typography>
        <Typography variant="h3" sx={{ ml: 1 }}>
          👋
        </Typography>
      </Stack>
      <Typography variant="body1" sx={{ pb: 3, ml: { xs: 3, sm: 3, md: 0 } }}>
        Let’s start a learning adventure
      </Typography>
      <Button
        disabled={true}
        onClick={() => {}}
        sx={{ py: 2, mb: 1, borderRadius: "15px" }}
      >
        <SessionType {...POPUP_SESSION} disabled={true} />
      </Button>
      <Button
        onClick={() => {
          setActiveStep(activeStep + 1);
        }}
        sx={{ color: "inherit", py: 2, borderRadius: "15px" }}
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
