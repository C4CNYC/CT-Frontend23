import { Box } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Image from "next/image";

export default function WelcomeSection(): React.ReactElement {
  return (
    <Stack
      sx={{
        width: "100%",
        maxWidth: { xs: "344px", sm: "344px", md: "none" },
        minHeight: "260px",
        borderRadius: 2,
        bgcolor: "#E6FBFC",
        flexWrap: { xs: "wrap", sm: "wrap", md: "nowrap", lg: "nowrap" },
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
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
          display: { xs: "flex", sm: "none", md: "flex", lg: "flex" },

          minWidth: { xs: "200px", sm: "250px", md: "200px", lg: "250px" },
        }}
      >
        <Image src="/assets/seo.svg" alt={""} width={300} height={257} />
      </Box>
    </Stack>
  );
}
