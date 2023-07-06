import { Box, Button } from "@mui/material";
import { alpha, styled } from "@mui/system";

const StyledOverlay = styled("div")(({ sx }) => ({
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 8,
  position: "absolute",
  backgroundColor: alpha("#fff", 0.24),
  backdropFilter: "blur(3px)",
  sx,
}));

interface Props {
  children: React.ReactElement;
  title?: string;
  sxContainer?: Record<string, any>;
  sxBg?: Record<string, any>;
  sxBtn?: Record<string, any>;
}
export function ComingSoon({
  children,
  title,
  sxContainer,
  sxBg,
  sxBtn,
}: Props): React.ReactElement {
  return (
    <Box
      sx={{
        position: "relative",
        boxShadow: 2,
        borderRadius: 2,
        overflow: "hidden",
        display: "flex",
        ...sxContainer,
      }}
    >
      {children}
      <StyledOverlay sx={sxBg}>
        <Button
          variant="soft"
          size="large"
          sx={{
            borderRadius: 0,
            px: "3em",
            transform: "rotateZ(-40deg)",
            position: "absolute",
            top: "25px",
            left: "-40px",
            pointerEvents: "none",
            ...sxBtn,
          }}
        >
          {title}
        </Button>
      </StyledOverlay>
    </Box>
  );
}
