import { useState } from "react";

import { Control } from "react-hook-form";
import { StepWizardChildProps } from "react-step-wizard";

import {
  Box,
  Button,
  Stack,
  Step,
  StepConnector,
  StepLabel,
  Stepper,
  stepConnectorClasses,
} from "@mui/material";
import { styled } from "@mui/system";

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
    <Stack>
      <Stepper
        activeStep={activeStep}
        sx={(theme) => ({
          "& .MuiStepLabel-root .Mui-completed": {
            color: "#43D4DD",
          },

          "& .MuiStepLabel-root .Mui-active": {
            color: "#43D4DD",
          },
          "& .MuiStepIcon-root": { color: theme.palette.grey[300] },
        })}
        connector={<ColorlibConnector />}
      >
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel />
          </Step>
        ))}
      </Stepper>
      <Box>
        {activeStep === 0 && <StepperRegister handleNext={handleNext} />}
        {activeStep === 1 && (
          <StepperInfo handleBack={handleBack} control={control} />
        )}
      </Box>
      {activeStep === 0 && (
        <Button
          onClick={() => {
            previousStep?.();
          }}
          sx={{
            background: "#EE467A33",
            color: "#EE467A",
            fontSize: "1.5rem",
            mt: 3,
            "&:hover": {
              background: "#f9e0ef",
            },
          }}
        >
          BACK
        </Button>
      )}
    </Stack>
  );
}

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      background: "#43D4DD",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      background: "#43D4DD",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.grey[800]
        : theme.palette.grey[300],
    borderRadius: 1,
  },
}));
