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

// ----------------------------------------------------------------------

Page403.getLayout = (page: React.ReactElement) => (
  <CompactLayout>{page}</CompactLayout>
);

// ----------------------------------------------------------------------

export default function Page403(): React.ReactElement {
  return (
    <>
      <Head>
        <title> 403 Forbidden </title>
      </Head>

      <MotionContainer>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" paragraph>
            No permission
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: "text.secondary" }}>
            The page you&apos;re trying access has restricted access.
            <br />
            Please refer to your system administrator
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <ForbiddenIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
        </m.div>

        <Button component={NextLink} href="/" size="large" variant="contained">
          Go to Home
        </Button>
      </MotionContainer>
    </>
  );
}
