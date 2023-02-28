import { Avatar, Box, Stack, Typography } from "@mui/material";

type Props = {
  name: string;
  email: string;
};
export default function TriberItem({ name, email }: Props): React.ReactElement {
  return (
    <Stack direction="row" alignItems="center">
      <Avatar sx={{ width: "50px", height: "50px" }}>N</Avatar>
      <Box sx={{ margin: "0 54px 0 16px" }}>
        <Typography variant="subtitle2">{name}</Typography>
        <Typography variant="body2">{email}</Typography>
      </Box>
      <Box
        sx={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          backgroundColor: "limegreen",
        }}
      />
    </Stack>
  );
}
