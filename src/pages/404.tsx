import Head from "next/head";
import NextLink from "next/link";

import { PageNotFoundIllustration } from "@assets/illustrations";
import { m } from "framer-motion";

import { Box, Button, Typography } from "@mui/material";

import { MotionContainer, varBounce } from "@components";
import CompactLayout from "@layouts/compact";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";

Page404.getLayout = (page: React.ReactElement) => (
  <CompactLayout>{page}</CompactLayout>
);

export default function Page404(): React.ReactElement {
  return (
    <>
      <Head>
        <title> 404 Page Not Found | CodeTribe</title>
      </Head>

      <MotionContainer>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" paragraph>
            Sorry, page not found!
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: "text.secondary" }}>
            Oppsie, it seems like we messed up. <br />
            Try going back or choose one of these pages.
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <PageNotFoundIllustration
            sx={{
              height: 260,
              my: { xs: 5, sm: 10 },
            }}
          />
          <Box display="flex" flexDirection="row">
            <Button
              component={NextLink}
              href={STUDENT_PATH_DASHBOARD.class.root}
              size="large"
              variant="contained"
              fullWidth
            >
              Home
            </Button>
            <Button
              component={NextLink}
              href={STUDENT_PATH_DASHBOARD.gallery.root}
              size="large"
              variant="contained"
              fullWidth
              sx={{
                ml: 2,
                mr: 2,
              }}
            >
              Gallery
            </Button>
            <Button
              component={NextLink}
              href={STUDENT_PATH_DASHBOARD.courses.root}
              size="large"
              variant="contained"
              fullWidth
            >
              Catalog
            </Button>
          </Box>
        </m.div>
      </MotionContainer>
    </>
  );
}
