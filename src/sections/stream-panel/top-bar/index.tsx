import Iconify from "@components/iconify/Iconify";
import Logo from "@components/logo/Logo";
import { Box, Button } from "@mui/material";
import { Stack } from "@mui/system";

export const TopBar = (): React.ReactElement => {
  return (
    <Stack height="50px" borderBottom="1px #cbcccb solid">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        height="50px"
        px="14px"
      >
        <Logo />
        <Button
          variant="contained"
          color="info"
          sx={{ px: 3 }}
        >
          INVITE
          <Iconify sx={{ ml: 1 }} icon="mdi:invite" />
        </Button>
      </Box>
    </Stack>
  );
};
