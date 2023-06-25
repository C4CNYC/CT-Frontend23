// next
import { SentIcon } from "@assets/icons";
import { Iconify } from "@ct-nx/components";
import CompactLayout from "@layouts/compact/CompactLayout";
import { Link, Typography } from "@mui/material";
import { PATH_AUTH } from "@routes/paths";
import AuthNewPasswordForm from "@sections/auth/AuthNewPasswordForm";
import Head from "next/head";
import NextLink from "next/link";

// ----------------------------------------------------------------------

NewPasswordPage.getLayout = (page: React.ReactElement) => (
  <CompactLayout>{page}</CompactLayout>
);

// ----------------------------------------------------------------------

export default function NewPasswordPage(): React.ReactElement {
  return (
    <>
      <Head>
        <title> New Password | CodeTribe</title>
      </Head>

      <SentIcon sx={{ mb: 5, height: 96 }} />
      <Typography variant="h5" mb={4}>
        Please, create a new password
      </Typography>
      <AuthNewPasswordForm />

      <Link
        component={NextLink}
        href={PATH_AUTH.login}
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
