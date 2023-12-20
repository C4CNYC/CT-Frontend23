import { Dispatch, SetStateAction } from "react";

import { MdArrowBackIosNew } from "react-icons/md";
import { StepWizardChildProps } from "react-step-wizard";

import { Button, IconButton, Stack, Theme, Typography } from "@mui/material";

import { Image } from "@components";
import { useTranslate } from "src/utils/translateHelper";

interface Props {
  setError: Dispatch<SetStateAction<string>>;
}

export default function EmailNotFound({
  previousStep,
  setError,
}: Partial<StepWizardChildProps> & Props): React.ReactElement {
  const translate = useTranslate();

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

      <Typography variant="h4">{translate("login_email_not_found")}</Typography>
      <Typography variant="h4" gutterBottom>
        {translate("login_or_wrong_password")}
      </Typography>
      <Typography variant="body1">{translate("login_try_again")}</Typography>
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
          sx={(theme: Theme) => ({
            background: theme.palette.grey[100],
            color: theme.palette.grey[500],
            fontSize: "1.5rem",
            mt: 1,
            "&:hover": {
              background: theme.palette.grey[200],
            },
          })}
        >
          {translate("login_go_back")}
        </Button>
      </Stack>
    </>
  );
}
