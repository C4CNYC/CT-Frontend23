import { FaSave } from "react-icons/fa";

import Button from "@mui/material/Button";

interface Props {
  onClick: VoidFunction;
  sx?: Record<string, unknown>;
}

export function SaveButton({ onClick, sx }: Props): JSX.Element {
  return (
    <Button
      variant="outlined"
      key="left"
      onClick={onClick}
      sx={{
        flexShrink: 0,
        ml: "auto!important",
        maxHeight: "40px",
        borderRadius: "20px",
        border: "2px solid #75CF6D",
        color: "#75CF6D",
        gap: 1,
        "&:hover": {
          border: "2px solid #75CF6D",
        },
        ...sx,
      }}
    >
      Save
      <FaSave size="18px" style={{ marginBottom: "3px" }} />
    </Button>
  );
}
