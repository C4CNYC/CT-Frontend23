import { Button, Divider, Stack, Typography } from "@mui/material";

import { Iconify } from "src/components/iconify";

import NotesItem from "./NotesItem";

export default function Notes() {
  return (
    <Stack
      direction="row"
      sx={{
        ml: { lg: 2 },
        mt: { xs: 2, sm: 2, md: 2, lg: 0 },
        maxWidth: { lg: "300px" },
        px: { sm: 1, md: 1, lg: 0 },
      }}
    >
      <Divider
        sx={{
          background: "#E6F5FD",
          borderRightWidth: "4px",
          borderRadius: 2,
        }}
        orientation="vertical"
      />
      <Stack sx={{ px: 1, width: "100%" }}>
        <Typography variant="h5" gutterBottom>
          <Iconify
            icon="solar:notes-broken"
            width={18}
            style={{ marginRight: "5px" }}
          />
          Notes
        </Typography>
        <Stack gap={2}>
          <NotesItem />
          <NotesItem />
        </Stack>
        <Button color="info" sx={{ mt: 2, alignSelf: "flex-start" }}>
          See more
        </Button>
      </Stack>
    </Stack>
  );
}
