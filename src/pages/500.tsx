// next
import Head from "next/head";
import NextLink from "next/link";

// assets
import { SeverErrorIllustration } from "@assets/illustrations";
import { m } from "framer-motion";

// @mui
import { Button, Typography } from "@mui/material";

// components
import { MotionContainer, varBounce } from "@components";
// layouts
import CompactLayout from "@layouts/compact";
import { useTranslate } from "src/utils/translateHelper";

// ----------------------------------------------------------------------

Page500.getLayout = (page: React.ReactElement) => (
  <CompactLayout>{page}</CompactLayout>
);

// ----------------------------------------------------------------------

export default function Page500(): React.ReactElement {
  const translate = useTranslate();

  return (
    <>
      <Head>
        <title> {translate("server_error")} </title>
      </Head>

      <MotionContainer>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" paragraph>
            {translate("server_error")}
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: "text.secondary" }}>
            {translate("there_was_an_error")}
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <SeverErrorIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
        </m.div>

        <Button component={NextLink} href="/" size="large" variant="contained">
          {translate("go_to_home")}
        </Button>
      </MotionContainer>
    </>
  );
}
