import Link from "next/link";

import CampaignIcon from "@mui/icons-material/Campaign";
import MicIcon from "@mui/icons-material/Mic";
import { Box, IconButton } from "@mui/material";
import { Stack } from "@mui/system";

import { Logo } from "@components";

import { TopBarMenu } from "./TopBarMenu";

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
        <Box sx={{ ml: { xs: 0, sm: 0, md: "-60px" } }}>
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
