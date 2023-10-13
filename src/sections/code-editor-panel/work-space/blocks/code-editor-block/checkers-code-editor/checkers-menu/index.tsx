import { type FC } from "react"

import { Box } from "@mui/material";

import CheckersItemButton from "../checkers-item-button";

import { type IValidationMap } from "src/utils/validationMaping";

interface CheckersMenuProps {
  checkers: IValidationMap[];
}

const CheckersMenu: FC<CheckersMenuProps> = ({ checkers }) => {
  return (
    <Box sx={BOX_SX}>
      {checkers.map((item) => (
        <CheckersItemButton
          key={item.text}
          active={!item.valid}
          name={item.text}
        />
      ))}
    </Box>
  );
}

const BOX_SX = {
  paddingTop: "32px",
  paddingBottom: "5px",
}

export default CheckersMenu;
