import { Box, Typography } from "@mui/material";
import { IUserProfileFollower } from "src/@types/courses";

interface Props {
  followers: IUserProfileFollower[];
}

export default function Contacts({
  followers,
}: Props): React.ReactElement | null {
  return (
    <>
      <Typography variant="h4" sx={{ my: 5 }}>
        Contacts
      </Typography>
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
        }}
      >
        Contacts
      </Box>
    </>
  );
}
