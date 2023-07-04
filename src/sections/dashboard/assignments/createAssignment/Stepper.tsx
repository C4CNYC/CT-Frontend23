import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Stepper from "@mui/material/Stepper";
import { useState } from "react";

import { useGetAssignmentQuery } from "src/redux/services/manager/assignments-manager";
import AssignmentAbout from "./AssignmentAbout";
import AssignmentAssigning from "./AssignmentAssigning";
import AssignmentSettings from "./AssignmentSettings";

const steps = [
  "Assignment Content",
  "Assignment About",
  "Assignment Assigning",
];

interface Props {
  schoolId: string;
  closeStepper: () => void;
}

export default function HorizontalNonLinearStepper({
  schoolId,
  closeStepper,
}: Props): React.ReactElement | null {
  const [activeStep, setActiveStep] = useState(0);
  const [assignmentId, setAssignmentId] = useState("");

  const { data: assignment } = useGetAssignmentQuery(
    { schoolId, assignmentId },
    { skip: !schoolId || !assignmentId }
  );

  const [completed] = useState<Record<number, boolean>>({});

  const handleNext = (): void => {
    if (activeStep === steps.length) return;
    if (activeStep === 2) closeStepper();
    setActiveStep(activeStep + 1);
  };

  const handleAssignmentId = (id: string): void => {
    setAssignmentId(id);
  };

  const handleBack = (): void => {
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
      <div style={{ marginTop: "50px" }}>
        <>
          {activeStep === 0 && (
            <AssignmentSettings
              assignment={assignment}
              getAssignmentId={handleAssignmentId}
              next={handleNext}
              schoolId={schoolId}
            />
          )}
          {activeStep === 1 && (
            <AssignmentAbout
              assignment={assignment}
              assignmentId={assignmentId}
              next={handleNext}
              back={handleBack}
              schoolId={schoolId}
            />
          )}
          {activeStep === 2 && (
            <AssignmentAssigning
              assignment={assignment}
              assignmentId={assignmentId}
              next={handleNext}
              back={handleBack}
              schoolId={schoolId}
            />
          )}
        </>
      </div>
    </Box>
  );
}
