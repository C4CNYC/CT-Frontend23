import { SxProps, Theme } from "@mui/system";

export const getQuestCardWraperSx = (theme: Theme): SxProps => ({
  mt: 3,
  p: { xs: "5px 0px", sm: "15px 20px", md: "15px 20px" },
  borderRadius: 2,
  backgroundColor: theme.palette.background.default,
});

export const QUEST_LINK_SX = {
  color: "#EE467A",
  display: "inline-flex",
  alignItems: "center",
  gap: 1,
};

export const QUEST_DIVIDER = {
  mx: 2,
  borderStyle: "dashed",
  borderRightWidth: "2px",
};
