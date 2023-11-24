import { addAlpha } from "@utils";

export const COURSE_ITEM_WRAPPER_SX = {
  background: "#ECF4FF",
  borderRadius: "25px",
  p: {
    xs: "20px 20px 20px 20px",
    sm: "30px 20px 20px 20px",
    md: "30px 55px 37px 40px",
  },
  cursor: "pointer",
  "&:hover": {
    boxShadow: 3,
  },
  //   transition: (theme) => theme.transitions.create("all"),
};

export const LIKE_BTN_WRAPPER_SX = {
  position: "absolute",
  top: "10px",
  right: "10px",
  width: "40px",
  height: "40px",
  zIndex: "10",
  opacity: 0.8,
  background: "rgba(250, 250, 250, .5)",
  "&:hover": { opacity: 1 },
};

export const COURSE_IMG_XS = {
  objectFit: "contain",
  borderRadius: "25px",
  flexShrink: 0,
  width: {
    xs: "200px",
    sm: "180px",
    md: "250px",
  },
  height: {
    xs: "200px",
    sm: "180px",
    md: "250px",
  },
};

export const COURSE_RATING_WRAPPER_SX = {
  position: "absolute",
  bottom: "0px",
  left: "calc(50% - 75px)",
  zIndex: "10",
  opacity: 0.5,
  width: {
    xs: "180px",
    sm: "160px",
    md: "125px",
  },
  "&:hover": { opacity: 1 },
};

export const CONTINUE_COURSE_BTN_SX = {
  p: "5px 15px",
  borderRadius: "25px",
  fontSize: "1rem",
  borderColor: "#D8476A",
  color: "#D8476A",
  whiteSpace: "nowrap",
  borderWidth: "2px",
  "&:hover": {
    border: "2px solid #D8476A",
    backgroundColor: addAlpha("#D8476A", 0.1),
  },
};

export const ENROLL_COURSE_BTN_SX = {
  p: "5px 15px",
  borderRadius: "25px",
  fontSize: "1rem",
  borderColor: "#5ED0D5",
  color: "#5ED0D5",
  whiteSpace: "nowrap",
  borderWidth: "2px",
  "&:hover": {
    border: "2px solid #5ED0D5",
    backgroundColor: addAlpha("#5ED0D5", 0.1),
  },
};

export const EXPLORE_COURSE_BTN_SX = {
  p: "5px 15px",
  borderRadius: "25px",
  fontSize: "1rem",
  borderColor: "#364954",
  color: "#364954",
  whiteSpace: "nowrap",
  borderWidth: "2px",
  "&:hover": {
    border: "2px solid #364954",
    backgroundColor: addAlpha("#364954", 0.1),
  },
};

export const COURSE_DETAILS_WRAPPER_SX = {
  gap: "15px",
  flexWrap: "wrap",
  mt: "25px",
  mb: {
    xs: "10px",
    sm: "15px",
    md: "15px",
  },
};
