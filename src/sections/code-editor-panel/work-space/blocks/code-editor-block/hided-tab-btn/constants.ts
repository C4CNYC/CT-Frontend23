export const HIDE_BUTTON_SX = {
  position: "absolute",
  top: 40,
  color: "#5FD0D5",
  minWidth: 20,
  "&:hover": {
    background: "none",
  },
};

export const COLLAPSEBAR_TITLE_SX = {
  textAlign: "center",
  minWidth: 150,
  transform: "rotate(270deg)",
  marginTop: "170px",
  color: "#D9D9E2",
  fontSize: "18px",
};

const BASE_COLLAPSEBAR_SX = {
  position: "absolute",
  top: 0,
  display: "flex",
  alignItems: "start",
  justifyContent: "center",
  width: 30,
  height: "100%",
  background: "#fff",
  zIndex: 10,
};

export const LEFT_BAR_SX = {
  ...BASE_COLLAPSEBAR_SX,
  left: 0,
  borderRight: "3px solid rgb(234, 234, 235)",
};

export const RIGHT_BAR_SX = {
  ...BASE_COLLAPSEBAR_SX,
  right: 0,
  borderLeft: "3px solid rgb(234, 234, 235)",
};
