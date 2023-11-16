import { add } from "date-fns";
import { animals, colors, uniqueNamesGenerator } from "unique-names-generator";

import { Theme } from "@mui/material";

import { bgBlur } from "@utils";

export const DATE_PARSER = (date?: string, increment: number = 0) =>
  date ? new Date(date) : add(new Date(), { days: increment });
export const DATE_FORMAT = "yyyy-MM-dd HH:mm:ss.SSSX";
export const DAYS_TO_END = 7;
export const DAYS_TO_CLOSE = 10;
export const TOOLTIP_TEXT = `A quest is an assignment for a class.
You can assign a part of or a full course, or you can assign any document link or open project to a class through a quest.`;

export const RANDOM_NAME = uniqueNamesGenerator({
  dictionaries: [colors, animals],
  separator: "_",
  length: 2,
});

export const selectStyle = (theme: Theme) => ({
  height: "41px",
  width: "100%",
  outline: "none",
  borderRadius: 1,
  background: theme.palette.mode === "light" ? "#fff" : "",
  "& fieldset": {
    border: theme.palette.mode === "light" ? "" : "1px solid #fff",
  },
});

export const inputNameStyles = (theme: Theme) => ({
  background: theme.palette.mode === "light" ? "#fff" : "",
  border: theme.palette.mode === "light" ? "" : "1px solid #fff",
  pt: 4,
  pb: 3,
  px: { xs: 0, sm: 3 },
  borderRadius: 2,
  "& fieldset": { border: "none" },
  ".MuiInputBase-input": {
    fontSize: { md: "30px" },
    fontWeight: "700",
  },
});

export const statusSelect = (theme: Theme) => ({
  height: "41px",
  maxWidth: { xs: "100%", sm: "300px", md: "300px" },
  background: theme.palette.mode === "light" ? "#fff" : "",
  border: theme.palette.mode === "light" ? "" : "1px solid #fff",
  outline: "none",
  borderRadius: 1,
  "& fieldset": { border: "none" },
  width: { xs: "100%", sm: "300px", md: "300px" },
});

export const mainContainerStyles = (theme: Theme) => ({
  px: 5,
  py: 8,
  border: theme.palette.mode === "light" ? "" : "1px solid #fff",
  ...bgBlur({
    color:
      theme.palette.mode === "light"
        ? "#f3f3f3"
        : theme.palette.background.default,
  }),
  borderRadius: 3,
});

export const INPUT_TEXT_SX = {
  position: "absolute",
  bottom: "10px",
  left: 0,
  width: "100%",
  textAlign: "center",
  fontSize: { xs: ".6rem", sm: ".8rem" },
};

export const AVATAR_SX = {
  position: "absolute",
  left: {
    xs: "calc(50% - 20px)",
    sm: "calc(50% - 25px)",
    md: "calc(50% - 35px)",
  },
  top: { xs: 20, sm: 20, md: 10 },
  width: { xs: "40px", sm: "50px", md: "70px" },
  height: { xs: "40px", sm: "50px", md: "70px" },
  background: "#1ACB7F",
  fontSize: { xs: "30px", sm: "40px", md: "55px" },
  zIndex: 15,
};

export const TABS_SX = {
  pb: 2,
  "& .MuiTabs-indicator": {
    backgroundColor: "#43D4DD",
  },
  "& .MuiTabs-flexContainer": {
    justifyContent: "flex-end",
  },
};

export const CONTAINER_INNER_SX = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  mb: 3,
};
export const FORM_HEADER_SX = {
  flexDirection: {
    xs: "column",
    md: "row",
  },
  justifyContent: "space-between",
  alignItems: "center",
  gap: 3,
  mb: 3,
  px: 5,
};
