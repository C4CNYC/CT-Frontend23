// next
import Head from "next/head";
import NextLink from "next/link";

import { SentIcon } from "@assets/icons";

import { Link, Typography } from "@mui/material";

import { Iconify } from "@components";
import CompactLayout from "@layouts/compact";
import { PATH_AUTH } from "@routes/paths";
import AuthNewPasswordForm from "@sections/auth/AuthNewPasswordForm";

// ----------------------------------------------------------------------

NewPasswordPage.getLayout = (page: React.ReactElement) => (
  <CompactLayout>{page}</CompactLayout>
);

// ----------------------------------------------------------------------

export default function NewPasswordPage(): React.ReactElement {
  return (
    <>
      <Head>
        <title> New Password </title>
      </Head>

      <SentIcon sx={{ mb: 5, height: 96 }} />

      <Typography variant="h3" paragraph>
        Request sent successfully!
      </Typography>

      <Typography sx={{ color: "text.secondary", mb: 5 }}>
        We&apos;ve sent a 6-digit confirmation email to your email.
        <br />
        Please enter the code in below box to verify your email.
      </Typography>

      <AuthNewPasswordForm />

      <Typography variant="body2" sx={{ my: 3 }}>
        Don’t have a code? &nbsp;
        <Link variant="subtitle2">Resend code</Link>
      </Typography>

      <Link
        component={NextLink}
        href={PATH_AUTH.singIn}
        color="inherit"
        variant="subtitle2"
        sx={{
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
