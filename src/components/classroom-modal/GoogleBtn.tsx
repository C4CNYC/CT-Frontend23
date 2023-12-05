import { FcGoogle } from "react-icons/fc";

import { Button, Typography } from "@mui/material";

import { useTranslate } from "src/utils/translateHelper";

interface IGoogleBtn {
  onClick: () => void;
}

export const GoogleBtn = ({ onClick }: IGoogleBtn) => {
  const translate = useTranslate();

  return (
    <Button
      fullWidth
      onClick={() => {
        onClick();
      }}
      sx={{
        background: "#f0f0f0",
        color: "#4f4f4f",
        height: "54px",
        p: "8px 28px",
        "&:hover": {
          background: "#e3e3e3",
          boxShadow: "none",
        },
      }}
    >
      <FcGoogle size="30px" style={{ marginLeft: "10px" }} />
      <Typography variant="h6" ml="10px">
        {translate("share_continue_with_google")}
      </Typography>
    </Button>
  );
};
