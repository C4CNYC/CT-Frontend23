import { SxProps } from "@mui/system";

export const TYP_SX = {
  color: "#D9D9E2",
  textTransform: "capitalize",
  ml: 1,
};

export const getButtonSx = (isCodeBlock: boolean | undefined): SxProps => ({
  ml: "auto",
  p: 0.2,
  mr: isCodeBlock ? 0 : 3,
  minWidth: "0",
  color: "#5FD0D5",
  "&:hover": {
    background: "none",
  },
});
