import { Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import { TfiSave } from "react-icons/tfi";

interface Props {
  onClick: VoidFunction;
}

export default function SaveButton({ onClick }: Props): JSX.Element {
  return (
    <Tooltip title="Save">
      <Button
        value="left"
        variant="outlined"
        key="left"
        onClick={onClick}
        sx={{ ml: "auto!important", width: 60 }}
        size="small"
      >
        <TfiSave />
      </Button>
    </Tooltip>
  );
}
