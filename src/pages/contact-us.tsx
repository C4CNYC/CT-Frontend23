// next
import Head from "next/head";
// @mui
import { Box, Container } from "@mui/material";
// layouts
import MainLayout from "../layouts/main";
// _mock
import { _mapContact } from "../_mock/arrays";
// sections
import { ContactForm, ContactHero, ContactMap } from "../sections/contact";

// ----------------------------------------------------------------------

ContactPage.getLayout = (page: React.ReactElement) => (
  <MainLayout>{page}</MainLayout>
);

// ----------------------------------------------------------------------

export default function ContactPage(): React.ReactElement {
  return (
    <>
      <Head>
        <title> Contact us | Minimal UI</title>
      </Head>

      <ContactHero />

      <Container sx={{ py: 10 }}>
        <Box
          gap={10}
          display="grid"
          gridTemplateColumns={{
            xs: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
          }}
        >
          <ContactForm />

          <ContactMap contacts={_mapContact} />
        </Box>
      </Container>
    </>
  );
}
