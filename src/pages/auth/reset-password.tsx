import Head from "next/head";
import NextLink from "next/link";

import { PasswordIcon } from "@assets/icons";

import { Link, Typography } from "@mui/material";

import { Iconify } from "@components";
import CompactLayout from "@layouts/compact";
import { PATH_AUTH } from "@routes/paths";
import AuthResetPasswordForm from "@sections/auth/AuthResetPasswordForm";
import { useTranslate } from "src/utils/translateHelper";

ResetPasswordPage.getLayout = (page: React.ReactElement) => (
  <CompactLayout>{page}</CompactLayout>
);

export default function ResetPasswordPage(): React.ReactElement {
  const translate = useTranslate();

  return (
    <>
      <Head>
        <title>{translate("reset_pass_page_title")}</title>
      </Head>

      <PasswordIcon sx={{ mb: 5, height: 96 }} />

      <Typography variant="h3" paragraph>
        {translate("reset_pass_title")}
      </Typography>

      <Typography sx={{ color: "text.secondary", mb: 5 }}>
        {translate("reset_pass_subtitle")}
      </Typography>

      <AuthResetPasswordForm />

      <Link
        component={NextLink}
        href={PATH_AUTH.signIn}
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
        {translate("reset_pass_return_cta")}
      </Link>
    </>
  );
}
