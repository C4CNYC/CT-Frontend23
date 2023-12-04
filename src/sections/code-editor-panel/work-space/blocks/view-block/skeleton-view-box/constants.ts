import { Theme } from "@mui/system";

export const PARENT_STACK_SX = { bgcolor: "#F2F2F2", p: 1 };
export const SKELETON_SX = { bgcolor: "#D9D9D9" };
export const getStackBottomSx = (theme: Theme) => ({
  backgroundColor: theme.palette.background.default,
  width: "100%",
  height: "calc(91vh - 80px)",
  borderRadius: "10px",
});

export const AVAILABLE_TYP_SX = {
  mt: "58px",
  mb: "20px",
  textAlign: "center",
  color: "#c4c4c4",
  fontSize: "1.1rem",
};

export const CODING_TYP_SX = {
  m: "0px auto",
  textAlign: "center",
  color: "#c4c4c4",
  fontSize: "1.1rem",
  maxWidth: "250px",
};
