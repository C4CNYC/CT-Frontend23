import { useState } from "react";

import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Stepper from "@mui/material/Stepper";

import ClassStep from "./ClassStep";
import OrganizationStep from "./OrganizationStep";
import SchoolStep from "./SchoolStep";

const steps = ["District / Organization", "School / Location", "Class Created"];

export default function HorizontalNonLinearStepper(): React.ReactElement {
  const [activeStep, setActiveStep] = useState(0);
  const handleNext = (): void => {
    if (activeStep === steps.length) return;
    setActiveStep(activeStep + 1);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper nonLinear activeStep={activeStep} sx={{ mb: 2 }}>
        {steps.map((label, index) => (
          <Step key={index} completed={true}>
            <StepButton
              color="inherit"
              sx={{
                pointerEvents: "none",
              }}
            />
          </Step>
        ))}
      </Stepper>
      <div>
        <>
          {activeStep === 0 && <OrganizationStep next={handleNext} />}
          {activeStep === 1 && <SchoolStep next={handleNext} />}
          {activeStep === 2 && <ClassStep />}
        </>
      </div>
    </Box>
  );
}
