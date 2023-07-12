import { PopupProps } from "react-map-gl";

// @mui
import { SxProps, Theme } from "@mui/material/styles";

//
import { StyledPopup } from "./styles";

// ----------------------------------------------------------------------

interface MapControlPopupProps extends PopupProps {
  sx?: SxProps<Theme>;
}

// ----------------------------------------------------------------------

export function MapPopup({
  sx,
  children,
  ...other
}: MapControlPopupProps): React.ReactElement | null {
  return (
    <StyledPopup anchor="bottom" sx={sx} {...other}>
      {children}
    </StyledPopup>
  );
}
