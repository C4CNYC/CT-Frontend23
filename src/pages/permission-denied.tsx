import Head from "next/head";

import { Box, Card, CardHeader, Container, Typography } from "@mui/material";

import { useSettingsContext } from "@components";

export default function PermissionDeniedPage(): React.ReactElement {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title> Permission Denied </title>
      </Head>

      <Container maxWidth={themeStretch ? false : "lg"}>
        <Box maxWidth="550px" m="20% auto">
          <Card>
            <CardHeader subheader="Permission Denied" />

            <Typography sx={{ p: 3, color: "text.secondary" }}>
              Sorry, but you do not have the necessary permissions to access
              this content. It appears that you have encountered an access
              restriction. Please ensure that you have the appropriate
              authorization or contact the system administrator for further
              assistance. We apologize for any inconvenience this may have
              caused. If you believe this is an error, please double-check your
              credentials and try again. Thank you for your understanding.
            </Typography>
          </Card>
        </Box>
      </Container>
    </>
  );
}
