import { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";

import SchoolStep from "./SchoolStep";
import OrganizationStep from "./OrganizationStep";
import ClassStep from "./ClassStep";

const steps = ["District / Organization", "School / Location", "Class Created"];

export default function HorizontalNonLinearStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});
  const handleNext = () => {
    if (activeStep === steps.length) return;
    setActiveStep(activeStep + 1);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper nonLinear activeStep={activeStep} sx={{ mb: 2 }}>
        {steps.map((label, index) => (
          <Step key={index} completed={completed[index]}>
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
