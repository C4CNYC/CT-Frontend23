const COMMON_BUTTON_SX = {
  position: "absolute",
  top: 40,
  right: 0,
  minWidth: "0",
  p: 1,
  background: "rgba(251, 221, 63, .7)",
  zIndex: 10,
  color: "#5FD0D5",
  "&:hover": {
    background: "rgb(251, 221, 63)",
  },
}

export const LEFT_BUTTON_SX = {
  ...COMMON_BUTTON_SX,
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
}

export const RIGHT_BUTTON_SX = {
  ...COMMON_BUTTON_SX,
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
}
