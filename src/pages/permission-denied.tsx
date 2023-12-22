import Head from "next/head";

import { Box, Card, CardHeader, Container, Typography } from "@mui/material";

import { useSettingsContext } from "@components";
import { useTranslate } from "src/utils/translateHelper";

export default function PermissionDeniedPage(): React.ReactElement {
  const { themeStretch } = useSettingsContext();
  const translate = useTranslate();

  return (
    <>
      <Head>
        <title> {translate("permission_denied")} </title>
      </Head>

      <Container maxWidth={themeStretch ? false : "lg"}>
        <Box maxWidth="550px" m="20% auto">
          <Card>
            <CardHeader subheader={translate("permission_denied")} />

            <Typography sx={{ p: 3, color: "text.secondary" }}>
              {translate("permission_denied_info")}
            </Typography>
          </Card>
        </Box>
      </Container>
    </>
  );
}
