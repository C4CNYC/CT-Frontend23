import { Dispatch, SetStateAction } from "react";

import { MdArrowBackIosNew } from "react-icons/md";
import { StepWizardChildProps } from "react-step-wizard";

import { Button, IconButton, Stack, Typography } from "@mui/material";

import { Image } from "@components";

interface Props {
  setError: Dispatch<SetStateAction<string>>;
}

export default function EmailNotFound({
  previousStep,
  setError,
}: Partial<StepWizardChildProps> & Props): React.ReactElement {
  return (
    <>
      <IconButton
        onClick={() => {
          setError("");
          previousStep?.();
        }}
        sx={{ ml: "-30px", mt: "-30px" }}
      >
        <MdArrowBackIosNew />
      </IconButton>

      <Typography variant="h4">Email not found</Typography>
      <Typography variant="h4" gutterBottom>
        or wrong password
      </Typography>
      <Typography variant="body1">
        Please try again or register as a new user
      </Typography>
      <Image
        sx={{ width: "130px", height: "130px", m: "5px auto" }}
        alt="error"
        src="/assets/on-boarding/notFound.svg"
      />
      <Stack sx={{ mt: 2 }}>
        <Button
          onClick={() => {
            setError("");
            previousStep?.();
          }}
          sx={(theme) => ({
            background: theme.palette.grey[100],
            color: theme.palette.grey[500],
            fontSize: "1.5rem",
            mt: 1,
            "&:hover": {
              background: theme.palette.grey[200],
            },
          })}
        >
          GO BACK
        </Button>
      </Stack>
    </>
  );
}
