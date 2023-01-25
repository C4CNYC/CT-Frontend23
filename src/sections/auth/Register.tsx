import NextLink from "next/link";
import { useState } from "react";
import { Stack, Typography, Link } from "@mui/material";
import LoginLayout from "../../layouts/login";
import { PATH_AUTH } from "../../routes/paths";
import AuthWithSocial from "./AuthWithSocial";
import AuthRegisterForm from "./AuthRegisterForm";
import { useTheme } from "@mui/material/styles";
import Stepper from "./Stepper/Stepper";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import IconButton from "@mui/material/IconButton";

export default function Register() {
  const theme = useTheme();
  const [stepperVisible, setStepperVisible] = useState(false);

  return (
    <LoginLayout title="Hi, I’m Mumu." subtitle="So glad you’re here!">
      <Stack spacing={2} sx={{ position: "relative" }}>
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          Sign up as a Teacher
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: theme.palette.grey[600],
            fontWeight: 400,
            textAlign: "center",
          }}
        >
          & sign-up your school.
        </Typography>
        <IconButton
          aria-label="info"
          sx={{
            position: "absolute",
            right: "-40px",
            padding: "10px",
            backgroundColor: "#FBDD3F",
            borderTopLeftRadius: "8px",
            borderBottomLeftRadius: "8px",
            borderBottomRightRadius: 0,
            borderTopRightRadius: 0,
          }}
        >
          <EmojiObjectsIcon sx={{ color: "#000" }} />
        </IconButton>
      </Stack>

      {!stepperVisible ? (
        <AuthRegisterForm next={() => setStepperVisible(true)} />
      ) : (
        <Stack
          direction="row"
          spacing={0.5}
          sx={{ mt: 2, justifyContent: "center" }}
        >
          <Stepper />
        </Stack>
      )}

      <Typography
        component="div"
        sx={{
          color: "text.secondary",
          mt: 3,
          typography: "caption",
          textAlign: "center",
        }}
      >
        {"By signing up, I agree to "}
        <Link underline="always" color="text.primary">
          Terms of Service
        </Link>
        {" and "}
        <Link underline="always" color="text.primary">
          Privacy Policy
        </Link>
        .
      </Typography>

      <AuthWithSocial />
    </LoginLayout>
  );
}
