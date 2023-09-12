import { useAtom } from "jotai";

import {
  Box,
  Button,
  List,
  Popper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { mobileTabManager } from "@sections/code-panel/atoms/mobile-tab-manager.atom";

interface Props {
  openPoper: boolean;
  anchorEl: HTMLElement | null;
  setOpenPoper: (open: boolean) => void;
  tips: string[];
}

export default function TipsPopover({
  openPoper,
  anchorEl,
  setOpenPoper,
  tips,
}: Props): React.ReactElement {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up(1000));
  const [{ activeTab }] = useAtom(mobileTabManager);
  if (!isDesktop && activeTab !== 1) {
    setOpenPoper(false);
  }

  return (
    <Popper
      id={"popper"}
      open={openPoper}
      anchorEl={anchorEl}
      sx={{
        width: isDesktop ? "20%" : "60%",
      }}
      placement="left-end"
      modifiers={[
        {
          name: "offset",
          options: {
            offset: [0, 10],
          },
        },
      ]}
    >
      <Box
        sx={{
          border: "1px solid #FBDD3F",
          background: "#155275",
          opacity: 0.5,
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          py: 1,
          px: 2,
          transition: "all .2s ease-in",
          "&:hover": {
            background: "#155275",
            opacity: 1,
          },
        }}
      >
        <List>
          {tips.map((t, i) => (
            <Typography key={t} variant="body1" sx={{ color: "#fff" }}>
              {i + 1}. {t}
            </Typography>
          ))}
        </List>

        <Button
          onClick={() => {
            setOpenPoper(false);
          }}
          sx={{
            alignSelf: "flex-end",
            background: "rgba(0, 0, 0, 0.3)",
            borderRadius: "25px",
            color: "#FBDD3F",
            fontWeight: 400,
            my: 1,
            "&:hover": {
              background: "rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          OK
        </Button>
      </Box>
    </Popper>
  );
}
