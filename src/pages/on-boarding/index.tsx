import { Box, Container } from "@mui/material";
import StepperIndex from "@sections/on-boarding/StepperIndex";
import Head from "next/head";

export default function OnBoarding(): React.ReactElement {
  return (
    <>
      <Head>
        <title> On-boarding | CodeTribe</title>
      </Head>
      <Box sx={{ background: "#E6FBFC" }}>
        <Container>
          <Box
            sx={{
              py: 3,
              px: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <StepperIndex />
          </Box>
        </Container>
      </Box>
    </>
  );
}
