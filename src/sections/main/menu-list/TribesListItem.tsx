import { 
  Box, 
  Stack, 
  Avatar, 
  Typography,
 } from "@mui/material";

interface Props {
  active: boolean;
}

export default function TribeListItem({ active }: Props): React.ReactElement {
  return (
    <Stack direction="row" sx={{ alignItems: "center", position: "relative" }}>
      <Box
        sx={(theme) => ({
          position: "absolute",
          top: "5px",
          left: "-12px",
          height: "20px",
          width: "4px",
          background: theme.palette.info.light,
          borderRadius: 2,
          zIndex: 10,
          display: active ? "block" : "none",
        })}
      />
      <Avatar
        variant="rounded"
        sx={(theme) => ({
          border: `2px solid ${theme.palette.info.light}`,
          width: "30px",
          height: "30px",
        })}
      />
      <Typography
        sx={(theme) => ({ ml: 2, color: theme.palette.text.secondary })}
        variant="body1"
      >
        Tribe name
      </Typography>
    </Stack>
  );
}
