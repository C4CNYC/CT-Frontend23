import { Iconify } from "@components";
import { IconButton, Paper, Stack, Typography } from "@mui/material";

export default function NotesItem(): React.ReactElement {
  return (
    <Paper elevation={4}>
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: "10px",
          pl: 1,
          py: 1,
        }}
      >
        <Stack>
          <Typography variant="caption">June 26</Typography>
          <Typography variant="body2">
            Hi Class 👋, It’s time to learn JavaScript 🏄‍♀️, and we’ll start with
            functions. So be ready for
          </Typography>
        </Stack>
        <Stack>
          <IconButton>
            <Iconify icon="tabler:pinned" />
          </IconButton>
          <IconButton>
            <Iconify icon="pepicons-pencil:dots-y" />
          </IconButton>
        </Stack>
      </Stack>
    </Paper>
  );
}
