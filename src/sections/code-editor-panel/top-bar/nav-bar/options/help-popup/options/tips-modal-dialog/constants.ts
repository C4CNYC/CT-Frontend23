import {
  type Theme,
  type SxProps,
  alpha
} from "@mui/system"

export const DIALOG_PAPER_PROPS = {
  sx: {
    width: "450px",
    maxHeight: "60vh",
  }
}

export const DIALOG_TITLE_STYLES = {
  display: "flex",
  alignItems: "center",
}

export const TYPS_TYP_STYLES = {
  flexGrow: 1,
  ml: 1,
  alignSelf: "flex-end"
}

export const ICON_BUTTON = {
  selfAlign: "flex-end",
  mr: "-10px"
}

export const getDialogContentStyles = (theme: Theme): SxProps<Theme> => ({
  pb: 3,
  "&::-webkit-scrollbar": {
    width: "0.3em",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: alpha(theme.palette.grey[600], 0.48),
    borderRadius: "2px",
  },
})
