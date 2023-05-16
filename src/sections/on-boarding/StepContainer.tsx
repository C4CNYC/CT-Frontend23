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
        width: "500px",
        borderRadius: "25px",
        position: "relative",
      }}
    >
      <Stack spacing={3} sx={{ alignItems: "flex-start" }}>
        {children}
      </Stack>
    </Paper>
  );
}
