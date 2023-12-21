export const styles = {
  WRAPPER_STACK_SX: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    background: "rgba(0, 0, 0, 0.5)",
    zIndex: 1,
    display: "none"
  },
  WRAPPER_STACK_ACTIVE: {
    display: "flex",
  },
  WRAPPER_BOX: {
    width: "80%",
    minHeight: "200px",
    zIndex: 1,
    background: "white",
    borderRadius: "20px",
    display: "flex",
    justifyContent: "flex-start",
    padding: "20px"
  },
  INPUT: {
    marginTop: "16px",
    marginBottom: "16px",
    "& input": {
      padding: "14px 10px"
    },
    "& span": {
      color: "#212B36"
    }
  },
  TITLE: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row"
  },
  ADD_BUTTON: {
    background: "#212B36",
  }
}