import { SxProps, Theme } from "@mui/system";

export const getLetsCodeBtnSx = (theme: Theme, isMini?: boolean): SxProps => ({
  mt: "24px",
  mx: 1,
  color: "#EE467A",
  bgcolor:
    theme.palette.mode === "light" ? "#FFF" : theme.palette.background.paper,
  boxShadow: " 0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
  "&:hover": {
    color: theme.palette.mode === "light" ? "#FFF" : "#F6F9FC",
    bgcolor: "#EE467A",
  },
  ...(isMini
    ? {
        borderRadius: "50%",
        m: "8px auto 16px",
        width: "35px",
        height: "35px",
        minWidth: "0",
        px: 1,
      }
    : {
        py: 1,
        fontSize: "24px",
        borderRadius: "50px",
        gap: 1,
      }),
});
