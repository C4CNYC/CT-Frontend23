import { Button } from "@mui/material";

import { Iconify } from "@components";

import BasePreference from "./BasePreference";

interface IResetCode {
  onReset: () => void;
}

const ResetCode = ({ onReset }: IResetCode): React.ReactElement => {
  return (
    <BasePreference title="reset code">
      <Button onClick={onReset} fullWidth variant="contained">
        <Iconify mr="7px" icon="carbon:reset" />
        Reset Lesson
      </Button>
    </BasePreference>
  );
};

export default ResetCode;
