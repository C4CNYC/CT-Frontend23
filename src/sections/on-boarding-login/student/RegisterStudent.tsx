import { useState } from "react";

import { Control } from "react-hook-form";
import { MdArrowBackIosNew } from "react-icons/md";
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
import { Theme, keyframes, styled } from "@mui/system";

import StepperInfo from "./StepperInfo";
import StepperRegister from "./StepperRegister";
import { FormValuesProps } from "./StudentStepper";

const steps = ["1", "2"];
interface Props {
  control: Control<FormValuesProps, any>;
}

export default function RegisterStudent({
  previousStep,
  control,
}: Partial<StepWizardChildProps> & Props): React.ReactElement {
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
      <Stack sx={{ justifyContent: "space-between" }}>
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
        <Stack sx={{ minHeight: "350px", mt: "30px" }}>
          {activeStep === 0 && <StepperRegister handleNext={handleNext} />}
          {activeStep === 1 && (
            <StepperInfo handleBack={handleBack} control={control} />
          )}
        </Stack>
      </Stack>

      <Button
        onClick={handleNext}
        sx={{
          background: "#43D4DD33",
          color: "#43D4DD",
          fontSize: "1.5rem",
          mt: 2,
          width: "100%",
        }}
      >
        {activeStep === 0 ? "WHOOPIE" : "ALL DONE"}
      </Button>
    </>
  );
}

const ColorlibConnector = styled(StepConnector)(({ theme }) => {
  return {
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
  };
});
