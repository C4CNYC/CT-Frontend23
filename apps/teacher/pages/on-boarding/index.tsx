import { Box } from "@mui/material";
import StepperIndex from "@sections/on-boarding/StepperIndex";
import Head from "next/head";

export default function OnBoarding(): React.ReactElement {
  return (
    <>
      <Head>
        <title> On-boarding | CodeTribe</title>
      </Head>
      <Box sx={{ background: "#E6FBFC" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            overflow: "hidden",
            px: 1.5,
          }}
        >
          <StepperIndex />
        </Box>
      </Box>
    </>
  );
}
