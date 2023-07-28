import { useEffect, useState } from "react";

import { MdArrowBackIosNew } from "react-icons/md";

import {
  IconButton,
  Step,
  StepConnector,
  StepLabel,
  Stepper,
  stepConnectorClasses,
} from "@mui/material";
import { styled } from "@mui/system";

const steps = ["1", "2"];

interface Props {
  prevStep: () => void;
  activeStep: number;
}

export default function StepperProgress({
  prevStep,
  activeStep,
}: Props): React.ReactElement {
  const [stepperActive, setStepperActive] = useState(0);

  useEffect(() => {
    if (activeStep === 2) {
      setStepperActive(0);
    }
    if (activeStep === 3) {
      setStepperActive(1);
    }
  }, [activeStep]);

  return (
    <>
      {activeStep === 2 && (
        <IconButton
          onClick={prevStep}
          sx={{ position: "absolute", top: "-22px", left: "-30px" }}
        >
          <MdArrowBackIosNew />
        </IconButton>
      )}
      <Stepper
        activeStep={stepperActive}
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
          width: "100%",
          pl: 1,
          mt: "-13px",
        })}
        connector={<ColorlibConnector />}
      >
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel />
          </Step>
        ))}
      </Stepper>
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
