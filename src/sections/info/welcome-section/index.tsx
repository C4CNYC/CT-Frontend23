import Image from "next/image";

import { Box } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function WelcomeSection(): React.ReactElement {
  return (
    <Stack
      sx={{
        width: "100%",
        minHeight: "260px",
        borderRadius: 2,
        bgcolor: "#E6FBFC",
        flexWrap: { xs: "wrap", sm: "wrap", md: "nowrap", lg: "nowrap" },
        display: "flex",
        flexDirection: { xs: "column", sm: "column", md: "row", lg: "row" },
        justifyContent: "space-between",
        alignItems: "center",
        pl: 4,
        pr: 2,
      }}
    >
      <Stack sx={{ py: 4 }}>
        <Typography
          variant="h4"
          sx={{
            variant: "subtitle1",
            fontWeight: "700",
            mb: "8px",
          }}
        >
          Welcome to the Maker Suite
        </Typography>
        <Typography variant="body1">
          Make a fun lesson or a course and share it with friends or everyone.
        </Typography>
      </Stack>
      <Box
        sx={{
          minWidth: { xs: "200px", sm: "250px", md: "200px", lg: "250px" },
        }}
      >
        <Image src="/assets/seo.svg" alt={""} width={300} height={257} />
      </Box>
    </Stack>
  );
}
