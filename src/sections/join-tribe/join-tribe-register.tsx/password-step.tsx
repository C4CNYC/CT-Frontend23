import { useState } from "react";

import { MdArrowBackIosNew } from "react-icons/md";

import { LoadingButton } from "@mui/lab";
import { Divider, IconButton, InputAdornment, Stack } from "@mui/material";

import { Iconify, RHFTextField } from "@components";

interface IPasswordStepProps {
  prevStep: () => void;
  isSubmiting: boolean;
}

export default function PasswordStep({
  prevStep,
  isSubmiting,
}: IPasswordStepProps): React.ReactElement {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Stack sx={{ minHeight: "360px", width: "280px" }}>
      <IconButton
        onClick={prevStep}
        sx={{ alignSelf: "flex-start", ml: "-50px" }}
      >
        <MdArrowBackIosNew />
      </IconButton>
      <Stack gap={2}>
        <RHFTextField
          name="firstName"
          label="First Name"
          sx={(theme) => ({
            "& .MuiInputBase-root": {
              height: "52px",
              background: theme.palette.grey[200],
            },
            "& fieldset": { border: "none" },
          })}
        />
        <RHFTextField
          name="lastName"
          label="Surname"
          sx={(theme) => ({
            "& .MuiInputBase-root": {
              height: "52px",
              background: theme.palette.grey[200],
            },
            "& fieldset": { border: "none" },
          })}
        />
        <Divider sx={{ my: 1 }} />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
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
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                  edge="end"
                  sx={{ color: "#02D3D7" }}
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <LoadingButton
        type="submit"
        loading={isSubmiting}
        sx={{
          background: "#43D4DD33",
          color: "#43D4DD",
          fontSize: "1.5rem",
          mt: 2,
          width: "100%",
        }}
      >
        WHOOPIE
      </LoadingButton>
    </Stack>
  );
}
