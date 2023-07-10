import { Box } from "@mui/material";

import CheckersItemButton from "./CheckersItemButton";
import { IValidationMap } from "src/utils/validationMaping";

interface Props {
  checkers: IValidationMap[];
}

export default function CheckersMenu({ checkers }: Props): React.ReactElement {
  return (
    <Box
      sx={{
        paddingTop: "32px",
        paddingBottom: "5px",
      }}
    >
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
