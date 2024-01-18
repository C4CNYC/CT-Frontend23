import { Button } from "@mui/material";

import { Iconify } from "src/components/iconify";
import { useTranslate } from "src/utils/translateHelper";

import BasePreference from "./BasePreference";

interface IResetCode {
  onReset: () => void;
}

const ResetCode = ({ onReset }: IResetCode): React.ReactElement => {
  const translate = useTranslate();

  return (
    <BasePreference title={translate("reset_lesson")}>
      <Button onClick={onReset} fullWidth variant="contained">
        <Iconify mr="7px" icon="carbon:reset" />
        {translate("reset_code")}
      </Button>
    </BasePreference>
  );
};

export default ResetCode;
