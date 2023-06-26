import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import { Link, Stack, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import NextLink from "next/link";
import { useState } from "react";
import LoginLayout from "../../layouts/login";
import { PATH_AUTH } from "../../routes/paths";
import AuthRegisterForm from "./AuthRegisterForm";
import AuthWithSocial from "./AuthWithSocial";
import Stepper from "./Stepper/Stepper";

export default function Register(): React.ReactElement {
  const [stepperVisible, setStepperVisible] = useState(false);

  return (
    <LoginLayout title="Hi, I’m Mumu." subtitle="So glad you’re here!">
      <Stack spacing={2} sx={{ position: "relative" }}>
        <Link
          component={NextLink}
          href={PATH_AUTH.login}
          variant="subtitle2"
          sx={{
            position: "absolute",
            right: "-30px",
            top: "-70px",
            color: "#02D3D7",
            display: "flex",
          }}
        >
          go to login <ArrowRightAltIcon sx={{ ml: 1 }} />
        </Link>
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          Create organisation
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
        <AuthRegisterForm
          next={() => {
            setStepperVisible(true);
          }}
        />
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
