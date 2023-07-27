import { useEffect, useState } from "react";

import { useAtom } from "jotai";
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

import { studentStepperAtom } from "./student-stepper-atom";

const steps = ["1", "2"];

export default function StepperProgres(): React.ReactElement {
  const [activeStep, setActiveStep] = useAtom(studentStepperAtom);
  const [stepperActive, setStepperActive] = useState(0);

  useEffect(() => {
    if (activeStep === 1) {
      setStepperActive(0);
    }
    if (activeStep === 2) {
      setStepperActive(1);
    }
  }, [activeStep]);

  return (
    <>
      <IconButton
        onClick={() => {
          setActiveStep(activeStep - 1);
        }}
        sx={{ position: "absolute", top: "-22px", left: "-30px" }}
      >
        <MdArrowBackIosNew />
      </IconButton>

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
