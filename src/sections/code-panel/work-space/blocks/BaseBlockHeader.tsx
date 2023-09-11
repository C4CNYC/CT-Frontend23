import { TbArrowsMinimize } from "react-icons/tb";

import {
  Box,
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

interface Props {
  title: string;
  icon: React.ReactElement;
  hideTabsHandler?: () => void;
}

export default function BaseBlockHeader({
  title,
  icon,
  hideTabsHandler,
}: Props): React.ReactElement {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up(1000));
  return (
    <Box
      sx={{
        display: isDesktop ? "flex" : "none",
        width: "100%",
        background: "#fff",
        alignItems: "center",
        gap: 2,
        px: 1,
        py: 0.5,
        borderBottom: isDesktop ? "2px solid #5FD0D5" : "none",
        zIndex: 2,
        position: "relative",
      }}
    >
      <Stack direction="row">
        {icon}
        <Typography
          variant="subtitle1"
          sx={{ color: "#D9D9E2", textTransform: "capitalize", ml: 1 }}
        >
          {title}
        </Typography>
      </Stack>
      {hideTabsHandler ? (
        <Button
          sx={{
            p: 0.2,
            minWidth: "0",
            ml: "auto",
            color: "#5FD0D5",
            "&:hover": { background: "none" },
          }}
          onClick={hideTabsHandler}
        >
          <TbArrowsMinimize size={19} />
        </Button>
      ) : null}
    </Box>
  );
}
