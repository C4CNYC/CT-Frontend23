import { Avatar, Stack, Tooltip, Typography } from "@mui/material";

export default function QuestMain(): React.ReactElement {
  return (
    <Stack sx={{ mt: 3 }}>
      <Stack sx={{ gap: 3, alignItems: "center", flexDirection: "row", mb: 1 }}>
        <Typography variant="h5">Quest</Typography>
        <Tooltip title="this is...">
          <Typography variant="body2" sx={{ textDecoration: "underline" }}>
            What is quest?
          </Typography>
        </Tooltip>
      </Stack>
      <Typography variant="h3" sx={{ mb: 1 }}>
        Quest name long long name ....
      </Typography>
      <Stack sx={{ ml: 1, flexDirection: "row", gap: 1 }}>
        <Avatar
          sx={{
            width: "30px",
            height: "30px",
            border: "2px solid #5D6C75",
            background: "#260236",
          }}
        >
          🦙
        </Avatar>
        <Typography variant="h5">Author name</Typography>
      </Stack>
    </Stack>
  );
}
