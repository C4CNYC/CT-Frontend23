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

// ----------------------------------------------------------------------

Page500.getLayout = (page: React.ReactElement) => (
  <CompactLayout>{page}</CompactLayout>
);

// ----------------------------------------------------------------------

export default function Page500(): React.ReactElement {
  return (
    <>
      <Head>
        <title> 500 Internal Server Error </title>
      </Head>

      <MotionContainer>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" paragraph>
            500 Internal Server Error
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: "text.secondary" }}>
            There was an error, please try again later.
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <SeverErrorIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
        </m.div>

        <Button component={NextLink} href="/" size="large" variant="contained">
          Go to Home
        </Button>
      </MotionContainer>
    </>
  );
}
