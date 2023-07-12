import NextLink from "next/link";

import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Link, Stack, Typography } from "@mui/material";

import LoginLayout from "../../layouts/login";
import { PATH_AUTH } from "../../routes/paths";
import AuthOrganizationForm from "./AuthOrganizationForm";
import TipButton from "./TipButton";

const TIP = `TIP: If your school has already signed up. 
Please ask for a “Teacher” Join-Link from one of the School Admins.`;

export default function RegisterOrganization(): React.ReactElement {
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
          Sing up to existed Organisation
        </Typography>
        <TipButton tip={TIP} />
      </Stack>

      <AuthOrganizationForm />

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
      {/* <AuthWithSocial /> */}
    </LoginLayout>
  );
}
