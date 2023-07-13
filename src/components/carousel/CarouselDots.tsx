// @mui
import { Box, BoxProps, SxProps } from "@mui/material";
import { Theme, styled } from "@mui/material/styles";

// ----------------------------------------------------------------------

interface StyledRootProps {
  rounded: boolean;
}

const StyledRoot = styled(Box, {
  shouldForwardProp: (prop) => prop !== "rounded",
})<StyledRootProps>(({ rounded, theme }) => ({
  zIndex: 9,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.primary.main,
  "& li": {
    width: 18,
    height: 18,
    opacity: 0.32,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    "&.slick-active": {
      opacity: 1,
      ...(rounded && {
        "& span": {
          width: 16,
          borderRadius: 6,
        },
      }),
    },
  },
}));

// ----------------------------------------------------------------------

interface Props extends BoxProps {
  rounded?: boolean;
  sx?: SxProps<Theme>;
}

export function CarouselDots(props?: Props): React.ReactElement {
  const rounded = props?.rounded ?? false;

  const sx = props?.sx;

  return (
    <StyledRoot component="ul" rounded={rounded} sx={sx} {...props}>
      {/* {dots} */}
    </StyledRoot>
  );
}
