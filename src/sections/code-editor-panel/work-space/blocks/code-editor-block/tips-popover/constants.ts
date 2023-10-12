export const DESKTOP_POPPER_WIDTH = "20%";
export const MOBILE_POPPER_WIDTH = "60%";

export const BOX_STYLES = {
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
}

export const TYP_COLOR = { color: "#fff" }

export const BUTTON_STYLES = {
  alignSelf: "flex-end",
  background: "rgba(0, 0, 0, 0.3)",
  borderRadius: "25px",
  color: "#FBDD3F",
  fontWeight: 400,
  my: 1,
  "&:hover": {
    background: "rgba(0, 0, 0, 0.2)",
  }
}

export const POPPER_OPTIONS = [
  {
    name: "offset",
    options: {
      offset: [0, 10],
    },
  },
]
