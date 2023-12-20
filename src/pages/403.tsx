// next
import Head from "next/head";
import NextLink from "next/link";

// assets
import { ForbiddenIllustration } from "@assets/illustrations";
import { m } from "framer-motion";

// @mui
import { Button, Typography } from "@mui/material";

// components
import { MotionContainer, varBounce } from "@components";
// layouts
import CompactLayout from "@layouts/compact";
import { useTranslate } from "src/utils/translateHelper";

// ----------------------------------------------------------------------

Page403.getLayout = (page: React.ReactElement) => (
  <CompactLayout>{page}</CompactLayout>
);

// ----------------------------------------------------------------------

export default function Page403(): React.ReactElement {
  const translate = useTranslate();

  return (
    <>
      <Head>
        <title> {translate("forbidden")} </title>
      </Head>

      <MotionContainer>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" paragraph>
            {translate("no_permission")}
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: "text.secondary" }}>
            {translate("page_restricted_access")}
            <br />
            {translate("refer_to_administrator")}
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <ForbiddenIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
        </m.div>

        <Button component={NextLink} href="/" size="large" variant="contained">
          {translate("go_to_home")}
        </Button>
      </MotionContainer>
    </>
  );
}
