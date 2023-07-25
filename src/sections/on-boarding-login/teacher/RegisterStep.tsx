import { useState } from "react";

import { fi } from "date-fns/locale";
import { MdArrowBackIos, MdArrowBackIosNew } from "react-icons/md";
import { StepWizardChildProps } from "react-step-wizard";

import {
  Box,
  Button,
  IconButton,
  Stack,
  Step,
  StepConnector,
  StepLabel,
  Stepper,
  stepConnectorClasses,
} from "@mui/material";
import { styled } from "@mui/system";

import AddSchool from "./AddSchool";
import AddTeacher from "./AddTeacher";

const steps = ["1", "2"];

export default function RegisterStep({
  previousStep,
}: Partial<StepWizardChildProps>): React.ReactElement {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = (): void => {
    if (activeStep === steps.length) return;
    setActiveStep(activeStep + 1);
  };
  const handleBack = (): void => {
    if (activeStep === 0) {
      return;
    }
    setActiveStep(activeStep - 1);
  };

  return (
    <>
      <IconButton
        onClick={() => {
          if (activeStep === 1) {
            handleBack();
          } else {
            previousStep?.();
          }
        }}
        sx={{ ml: "-30px", mt: "-30px" }}
      >
        <MdArrowBackIosNew />
      </IconButton>
      <Stepper
        activeStep={activeStep}
        sx={(theme) => ({
          "& .MuiStepLabel-root .Mui-completed": {
            color: "#43D4DD",
            transition: "all .3s linear!important",
          },

          "& .MuiStepLabel-root .Mui-active": {
            color: "#43D4DD",
            transition: "all .3s linear!important",
          },
          "& .MuiStepIcon-root": { color: theme.palette.grey[300] },
          justifySelf: "flex-start",
          px: 3,
          mt: "-38px",
        })}
        connector={<ColorlibConnector />}
      >
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel />
          </Step>
        ))}
      </Stepper>
      <Stack sx={{ minHeight: "400px", mt: "30px" }}>
        {activeStep === 0 && <AddTeacher handleNext={handleNext} />}
        {activeStep === 1 && <AddSchool handleBack={handleBack} />}
      </Stack>
      <Button
        onClick={handleNext}
        sx={{
          background: "#43D4DD33",
          color: "#43D4DD",
          fontSize: "1.5rem",
          mt: 1,
          width: "100%",
        }}
      >
        {activeStep === 0 ? "WHOOPIE" : "ALL DONE"}
      </Button>
    </>
  );
}

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      background: "#43D4DD",
      transition: "all .3s linear!important",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      background: "#43D4DD",
      transition: "all .3s linear!important",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    transition: "all .3s linear!important",
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.grey[800]
        : theme.palette.grey[300],
    borderRadius: 1,
  },
}));
