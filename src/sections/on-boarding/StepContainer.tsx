import { Paper, Stack } from "@mui/material";

interface Props {
  children: React.ReactElement[] | React.ReactElement;
}

export default function StepContainer({ children }: Props): React.ReactElement {
  return (
    <Paper
      elevation={10}
      sx={{
        py: 3,
        px: { xs: 1, sm: 1, md: 4 },
        borderRadius: "25px",
        position: "relative",
        color: "#616161",
        m: "0 auto",
        width: { xs: "none", sm: "none", md: "550px" },
      }}
    >
      <Stack sx={{ alignItems: "center" }}>{children}</Stack>
    </Paper>
  );
}
