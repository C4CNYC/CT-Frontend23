import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";

export default function ChallengeTask(): React.ReactElement {
  return (
    <>
      <Stack>
        <Paper
          elevation={8}
          sx={{
            borderRadius: "0",
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "#E6FBFC",
            padding: 1,
            mb: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <ReceiptLongIcon />
            <Typography variant="body1">Exercise</Typography>
          </Box>
          <IconButton sx={{ padding: 0 }}>
            <ArrowBackIosIcon sx={{ width: "15px" }} />
          </IconButton>
        </Paper>
        <Box sx={{ padding: 1 }}>
          <Typography variant="h4">When to write some code?</Typography>
          <Typography variant="subtitle1">
            You could write whenever you want. If you have light, of course
          </Typography>
        </Box>
        <Paper
          elevation={8}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            borderRadius: "0",
            backgroundColor: "#E6FBFC",
            mt: 2,
            p: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <BeenhereIcon />
            <Typography variant="body1">Instruction</Typography>
          </Box>
          <Typography variant="subtitle2">XP 50</Typography>
        </Paper>
      </Stack>
    </>
  );
}
