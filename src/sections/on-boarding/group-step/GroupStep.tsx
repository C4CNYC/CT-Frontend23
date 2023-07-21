import { MdOutlineArrowBackIos } from "react-icons/md";
import { StepWizardChildProps } from "react-step-wizard";

import { IconButton, Stack, Typography } from "@mui/material";

import StepContainer from "../StepContainer";
import GroupItem from "./GroupItem";

export default function GroupStep({
  nextStep,
  previousStep,
}: Partial<StepWizardChildProps>): React.ReactElement {
  return (
    <StepContainer>
      <Stack>
        <IconButton
          onClick={previousStep}
          sx={{
            position: "absolute",
            top: "5px",
            left: "5px",
            width: "50px",
            height: "50px",
          }}
        >
          <MdOutlineArrowBackIos size="30px" color="#68767F" />
        </IconButton>
        <Stack sx={{ pl: { xs: 6, md: 3 }, pt: 2 }}>
          <Typography variant="h3">Create Group</Typography>
          <Typography variant="body1" sx={{ display: "inline-flex", pb: 1 }}>
            Learn and interact in your preferred format
          </Typography>
        </Stack>
        <Stack>
          {GROUPS.map((el, i) => (
            <GroupItem {...el} key={i + 20} nextStep={nextStep} />
          ))}
        </Stack>
      </Stack>
    </StepContainer>
  );
}

const GROUPS = [
  {
    color: "#43D4DD33",
    img: "/assets/on-boarding/fire.svg",
    title: "Classroom",
    subtitle: "You know the drill.",
  },
  {
    color: "#EE467A33",
    img: "/assets/on-boarding/game.svg",
    title: "Coding Club",
    badge: "BETA",
    subtitle: "Create goals and help your community with code",
  },
  {
    color: "#FBDD3F33",
    img: "/assets/on-boarding/creator.svg",
    title: "Remote Cohort",
    subtitle: "Support remote learning and build together",
  },
  {
    color: "#CDFDE9",
    img: "/assets/on-boarding/data.svg",
    title: "Open Community",
    subtitle: "Invite the cousins, it’s your space.",
    badge: "BETA",
  },
];
