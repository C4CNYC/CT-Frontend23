import Logo from "@components/logo/Logo";
import CampaignIcon from "@mui/icons-material/Campaign";
import MicIcon from "@mui/icons-material/Mic";
import { Box, IconButton } from "@mui/material";
import { Stack } from "@mui/system";
import Link from "next/link";
import { TopBarMenu } from "./TopBarMenu";

export const TopBar = (): React.ReactElement => {
  return (
    <Stack height="50px" borderBottom="1px #cbcccb solid">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        height="50px"
        px="24px"
      >
        <Logo />
        <Box>
          <Link href={"/"}>
            <IconButton>
              <MicIcon />
            </IconButton>
          </Link>
          <Link href={"/"}>
            <IconButton>
              <CampaignIcon />
            </IconButton>
          </Link>
        </Box>
        <TopBarMenu />
      </Box>
    </Stack>
  );
};
