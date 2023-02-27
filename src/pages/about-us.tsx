// next
import Head from "next/head";
// @mui
import { Divider } from "@mui/material";
// layouts
import MainLayout from "../layouts/main";
// sections
import {
  AboutHero,
  AboutTeam,
  AboutTestimonials,
  AboutVision,
  AboutWhat,
} from "../sections/about";

// ----------------------------------------------------------------------

AboutPage.getLayout = (page: React.ReactElement) => (
  <MainLayout>{page}</MainLayout>
);

// ----------------------------------------------------------------------

export default function AboutPage(): React.ReactElement {
  return (
    <>
      <Head>
        <title> About us | Minimal UI</title>
      </Head>

      <AboutHero />

      <AboutWhat />

      <AboutVision />

      <Divider
        orientation="vertical"
        sx={{ my: 10, mx: "auto", width: 2, height: 40 }}
      />

      <AboutTeam />

      <AboutTestimonials />
    </>
  );
}
