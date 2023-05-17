import { IconButton, Stack, Typography } from "@mui/material";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { StepWizardChildProps } from "react-step-wizard";
import StepContainer from "../StepContainer";
import CourseType from "./CourseType";

export default function CourseStep({
  goToStep,
}: Partial<StepWizardChildProps>): React.ReactElement {
  return (
    <StepContainer>
      <IconButton
        onClick={() => {
          goToStep?.(1);
        }}
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
      <Stack sx={{ pl: 3, pt: 2 }}>
        <Typography variant="h3">Select a Course</Typography>
        <Typography variant="body1" sx={{ display: "inline-flex", pb: 1 }}>
          Project-based, hands-on and modular
        </Typography>
      </Stack>
      <Stack gap={2}>
        {COURSE_STEPS.map((el, i) => (
          <CourseType {...el} key={el.title} goToStep={goToStep} />
        ))}
      </Stack>
    </StepContainer>
  );
}

const COURSE_STEPS = [
  {
    color: "#43D4DD33",
    img: "/assets/on-boarding/fire.svg",
    title: "Wild Foundations",
    subtitle:
      "Three enticing web projects sparking literary & creative delight",
    chips: ["Rookie", "Web-dev", "6-10 Grade", "15 Sessions"],
    disabled: false,
  },
  {
    color: "#EE467A33",
    img: "/assets/on-boarding/game.svg",
    title: "Platformer Uprising",
    badge: "BETA",
    subtitle:
      "Riveting & synapse-snapping, super-mario-style game-dev projects - Fun & unrivaled.",
    chips: ["Beginner", "Game-dev", "6-10 Grade", "24 Sessions"],
    disabled: false,
  },
  {
    color: "#FBDD3F33",
    img: "/assets/on-boarding/creator.svg",
    title: "Wild Foundations",
    subtitle:
      "Three enticing web projects sparking literary & creative delight",
    badge: "Coming Soon",
    chips: ["Rookie", "Web-dev", "6-10 Grade", "15 Sessions"],
    disabled: true,
  },
  {
    color: "#CDFDE9",
    img: "/assets/on-boarding/data.svg",
    title: "Data-Spinning",
    subtitle:
      "Integrate logic into websites with Brython, then use APIs & massage data into inspiring apps.",
    badge: "Coming Soon",
    chips: ["Intermediate", "Python", "9-12 Grade", "16 Sessions"],
    disabled: true,
  },
];
