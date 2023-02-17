import { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";

import AssignmentSettings from "./AssignmentSettings";
import AssignmentAssigning from "./AssignmentAssigning";
import AssignmentAbout from "./AssignmentAbout";

const steps = [
  "Assignment Content",
  "Assignment About",
  "Assignment Assigning",
];

type Props = {
  school_id: string;
  closeStepper: () => void;
};

export default function HorizontalNonLinearStepper({
  school_id,
  closeStepper,
}: Props) {
  const [activeStep, setActiveStep] = useState(0);
  const [assignmentId, setAssignmentId] = useState("");

  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});

  const handleNext = () => {
    if (activeStep === steps.length) return;
    if (activeStep === 2) closeStepper();
    setActiveStep(activeStep + 1);
  };

  const handleAssignmentId = (id: string) => {
    setAssignmentId(id);
  };

  const handleBack = () => {
    if (activeStep === 0) return;
    setActiveStep(activeStep - 1);
  };

  return (
    <Box>
      <Stepper nonLinear activeStep={activeStep}>
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
      <div style={{ marginTop: "50px"}}>
        <>
          {activeStep === 0 && (
            <AssignmentSettings
              getAssignmentId={handleAssignmentId}
              next={handleNext}
              school_id={school_id}
            />
          )}
          {activeStep === 1 && (
            <AssignmentAbout
              assignmentId={assignmentId}
              next={handleNext}
              back={handleBack}
              school_id={school_id}
            />
          )}
          {activeStep === 2 && (
            <AssignmentAssigning
              assignmentId={assignmentId}
              next={handleNext}
              back={handleBack}
              school_id={school_id}
            />
          )}
        </>
      </div>
    </Box>
  );
}
