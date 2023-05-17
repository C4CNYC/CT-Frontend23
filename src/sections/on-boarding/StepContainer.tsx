import { Paper, Stack } from "@mui/material";

interface Props {
  children: React.ReactElement[];
}

export default function StepContainer({ children }: Props): React.ReactElement {
  return (
    <Paper
      elevation={10}
      sx={{
        py: 3,
        px: 4,
        borderRadius: "25px",
        position: "relative",
      }}
    >
      <Stack sx={{ alignItems: "flex-start", gap: 3 }}>{children}</Stack>
    </Paper>
  );
}
