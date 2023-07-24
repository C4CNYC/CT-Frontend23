// next
import Head from "next/head";
import NextLink from "next/link";

import { PasswordIcon } from "@assets/icons";

import { Link, Typography } from "@mui/material";

import { Iconify } from "@components";
import CompactLayout from "@layouts/compact";
import { PATH_AUTH } from "@routes/paths";
import AuthResetPasswordForm from "@sections/auth/AuthResetPasswordForm";

// ----------------------------------------------------------------------

ResetPasswordPage.getLayout = (page: React.ReactElement) => (
  <CompactLayout>{page}</CompactLayout>
);

// ----------------------------------------------------------------------

export default function ResetPasswordPage(): React.ReactElement {
  return (
    <>
      <Head>
        <title> Reset Password </title>
      </Head>

      <PasswordIcon sx={{ mb: 5, height: 96 }} />

      <Typography variant="h3" paragraph>
        Forgot your password?
      </Typography>

      <Typography sx={{ color: "text.secondary", mb: 5 }}>
        Please enter the email address associated with your account and We will
        email you a link to reset your password.
      </Typography>

      <AuthResetPasswordForm />

      <Link
        component={NextLink}
        href={PATH_AUTH.singIn}
        color="inherit"
        variant="subtitle2"
        sx={{
          mt: 3,
          mx: "auto",
          alignItems: "center",
          display: "inline-flex",
        }}
      >
        <Iconify icon="eva:chevron-left-fill" width={16} />
        Return to sign in
      </Link>
    </>
  );
}
