export const styles = {
  WRAPPER_STACK_SX: {
    lineHeight: "24px",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    background: "#282c34",
    borderBottom: "2px solid #abb2bf",
  },
  TABS: {
    padding: 0,
    marginBottom: "-2px",
    minHeight: "32px",
    "& .MuiTabs-indicator": {
      background: "#282c34",
      height: "3px"
    }
  },
  TAB: {
    marginRight: "0px !important",
    padding: "0px 10px",
    textTransform: "none",
    fontSize: "12px",
    minHeight: "32px",
    color: "#abb2bf!important",
    "&[aria-selected=true]": {
      color: "white !important"
    }
  },
  DEV_ICON: {
    marginRight: "8px"
  }
}