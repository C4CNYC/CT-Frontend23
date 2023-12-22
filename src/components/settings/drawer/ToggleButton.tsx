import { useEffect, useState } from "react";

// @mui
import { Box, Tooltip } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";

// utils
import { bgBlur } from "@utils";
import { useTranslate } from "src/utils/translateHelper";

//
import { IconButtonAnimate } from "../../animate";
import { SvgColor } from "../../svg-color";
//
import BadgeDot from "./BadgeDot";

// ----------------------------------------------------------------------

export interface ToggleButtonProps {
  open: boolean;
  notDefault: boolean;
  onToggle: VoidFunction;
}

export default function ToggleButton({
  notDefault,
  open,
  onToggle,
}: ToggleButtonProps): React.ReactElement | null {
  const theme = useTheme();
  const translate = useTranslate();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Box
      sx={{
        p: 0.5,
        right: 24,
        bottom: 24,
        zIndex: 999,
        position: "fixed",
        borderRadius: "50%",
        boxShadow: `-12px 12px 32px -4px ${alpha(
          theme.palette.mode === "light"
            ? theme.palette.grey[600]
            : theme.palette.common.black,
          0.36
        )}`,
        ...bgBlur({ color: theme.palette.background.default }),
      }}
    >
      {notDefault && !open && (
        <BadgeDot
          sx={{
            top: 8,
            right: 10,
          }}
        />
      )}

      <Tooltip title={translate("settings")}>
        <IconButtonAnimate color="primary" onClick={onToggle} sx={{ p: 1.25 }}>
          <SvgColor src="/assets/icons/setting/ic_setting.svg" />
        </IconButtonAnimate>
      </Tooltip>
    </Box>
  );
}
