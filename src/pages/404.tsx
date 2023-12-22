import Head from "next/head";
import NextLink from "next/link";

import { PageNotFoundIllustration } from "@assets/illustrations";
import { m } from "framer-motion";

import { Box, Button, Typography } from "@mui/material";

import { MotionContainer, varBounce } from "@components";
import CompactLayout from "@layouts/compact";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import { useTranslate } from "src/utils/translateHelper";

Page404.getLayout = (page: React.ReactElement) => (
  <CompactLayout>{page}</CompactLayout>
);

export default function Page404(): React.ReactElement {
  const translate = useTranslate();

  return (
    <>
      <Head>
        <title> {translate("not_found")} | CodeTribe</title>
      </Head>

      <MotionContainer>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" paragraph>
            {translate("sorry_not_found")}
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: "text.secondary" }}>
            {translate("we_messed_up")} <br />
            {translate("try_going_back")}
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
              {translate("home")}
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
              {translate("gallery")}
            </Button>
            <Button
              component={NextLink}
              href={STUDENT_PATH_DASHBOARD.courses.root}
              size="large"
              variant="contained"
              fullWidth
            >
              {translate("sidebar_menu_catalog")}
            </Button>
          </Box>
        </m.div>
      </MotionContainer>
    </>
  );
}
