// next
import { EmailInboxIcon } from "@assets/icons";
import CompactLayout from "@layouts/compact";
import { Link, Typography } from "@mui/material";
import { PATH_AUTH } from "@routes/paths";
import AuthVerifyCodeForm from "@sections/auth/AuthVerifyCodeForm";
import Head from "next/head";
import NextLink from "next/link";
import { Iconify } from "@ct-nx/components";

// ----------------------------------------------------------------------

VerifyCodePage.getLayout = (page: React.ReactElement) => (
  <CompactLayout>{page}</CompactLayout>
);

// ----------------------------------------------------------------------

export default function VerifyCodePage(): React.ReactElement {
  return (
    <>
      <Head>
        <title> Verify Code | CodeTribe</title>
      </Head>

      <EmailInboxIcon sx={{ mb: 5, height: 96 }} />

      <Typography variant="h3" paragraph>
        Please check your email!
      </Typography>

      <Typography sx={{ color: "text.secondary", mb: 5 }}>
        We have emailed a 6-digit confirmation code to acb@domain, please enter
        the code in below box to verify your email.
      </Typography>

      <AuthVerifyCodeForm />

      <Typography variant="body2" sx={{ my: 3 }}>
        Don’t have a code? &nbsp;
        <Link variant="subtitle2">Resend code</Link>
      </Typography>

      <Link
        component={NextLink}
        href={PATH_AUTH.login}
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
