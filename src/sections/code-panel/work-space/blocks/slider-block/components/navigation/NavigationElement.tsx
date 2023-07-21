import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Button } from "@mui/material";

import { BtnType } from ".";

interface INavigationElement {
  disabled?: boolean;
  direction?: "prev" | "next";
  onClick: () => void;
  sx?: Record<string, any>;
  children?: React.ReactElement | null;
  backType?: string;
}

const NavigationElement = ({
  disabled,
  onClick,
  sx,
  children,
  direction,
  backType,
}: INavigationElement): React.ReactElement => {
  return (
    <>
      <Button
        variant="outlined"
        sx={{
          fontSize: "1rem",
          display: "flex",
          textTransform: "capitalize",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          border: "none! important",
          whiteSpace: "nowrap",
          pointerEvents: disabled ? "none" : "auto",
          "&:hover": {
            border: "none! important",
            backgroundColor: "none",
            opacity: 0.7,
          },
          ...sx,
        }}
        onClick={onClick}
      >
        {direction === "prev" ? "BACK" : backType}
        {backType === BtnType.coding ? <ArrowForwardIosIcon /> : null}
      </Button>
      {children}
    </>
  );
};
export default NavigationElement;
