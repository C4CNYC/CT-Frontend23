import { Paper } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { CardInfo } from "@components";

export default function InfoSectionHome(): React.ReactElement {
  return (
    <Paper
      elevation={10}
      sx={{ pt: 2, pb: 5, px: 4, borderRadius: 2, width: "100%" }}
    >
      <Typography variant="h5" sx={{ mt: 2, mb: 4 }}>
        How Slides Work: Choose your format !!!
      </Typography>

      <Stack
        direction="row"
        sx={{
          gap: 4,
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <CardInfo />
      </Stack>
    </Paper>
  );
}
