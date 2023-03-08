import { Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import { TfiSave } from "react-icons/tfi";

interface Props {
  onClick: VoidFunction;
  sx?: {};
}

export default function SaveButton({ onClick, sx }: Props): JSX.Element {
  return (
    <Tooltip title="Save">
      <Button
        value="left"
        variant="outlined"
        key="left"
        onClick={onClick}
        sx={{ ml: "auto!important", width: 60, maxHeight: "30px", ...sx }}
        size="small"
      >
        <TfiSave />
      </Button>
    </Tooltip>
  );
}
