import { useAtom } from "jotai";
import { FaArrowRight } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdArrowBackIosNew } from "react-icons/md";
import { StepWizardChildProps } from "react-step-wizard";

import {
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";

import { RHFTextField } from "@components";

import { studentStepperAtom } from "../student/student-stepper-atom";
import { teacherStepperAtom } from "./teacher-stepper-atom";

interface Props {
  isValid?: boolean;
  isTeacher: boolean;
}

export default function SingUp({
  nextStep,
  isValid,
  isTeacher,
}: Partial<StepWizardChildProps> & Props): React.ReactElement {
  const [activeStep, setActiveStep] = useAtom(teacherStepperAtom);
  const [activeStepStudent, setActiveStepStudent] = useAtom(studentStepperAtom);

  return (
    <>
      {isTeacher && (
        <IconButton
          onClick={() => {
            setActiveStep(activeStep - 1);
          }}
          sx={{ ml: "-30px", mt: "-30px" }}
        >
          <MdArrowBackIosNew />
        </IconButton>
      )}
      <Stack
        direction="row"
        sx={{ ml: { xs: 3, sm: 3, md: 0 }, mt: isTeacher ? "50px" : "70px" }}
      >
        <Typography variant="h3">Sing up</Typography>
        <Typography variant="h3" sx={{ ml: 1 }}>
          😃
        </Typography>
      </Stack>
      <Typography variant="body1" sx={{ pb: 3, ml: { xs: 3, sm: 3, md: 0 } }}>
        This is my first time here
      </Typography>
      <Stack sx={{ mt: 1 }}>
        <RHFTextField
          name="email"
          label="Email"
          defaultValue=""
          sx={(theme) => ({
            "& .MuiInputBase-root": {
              height: "52px",
              background: theme.palette.grey[200],
            },
            "& fieldset": { border: "none" },
            "& input:-webkit-autofill": {
              "-webkit-background-clip": "text",
              "-webkit-text-fill-color": "#000",
              transition: "background-color 5000s ease-in-out 0s",
              boxShadow: `inset 0 0 .1px .1px ${theme.palette.grey[200]}`,
            },
          })}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onClick={() => {
                    if (!isValid) return;
                    if (isTeacher) {
                      setActiveStep(activeStep + 1);
                    } else {
                      setActiveStepStudent(activeStepStudent + 1);
                    }
                  }}
                >
                  <FaArrowRight color={isValid ? "#43D4DD" : ""} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Divider sx={{ my: 3 }} flexItem>
          <Typography
            sx={(theme) => ({ color: theme.palette.grey[500], mx: 1 })}
            variant="body1"
          >
            OR
          </Typography>
        </Divider>
        <Button
          sx={(theme) => ({
            color: theme.palette.grey[600],
            textTransform: "none",
            py: 1.5,
            mb: 1,
            gap: 2,
            background: theme.palette.grey[200],
            fontWeight: 400,
            fontSize: "1.3em",
            "&:hover": {
              color: theme.palette.grey[900],
            },
          })}
        >
          <FcGoogle size="50px" />
          Sing up with Google
        </Button>
      </Stack>
    </>
  );
}
