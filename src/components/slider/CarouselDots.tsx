// @mui
import { Box, BoxProps, Stack, SxProps } from "@mui/material";
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
  height: "fit-content",
  width: "auto",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.primary.contrastText,
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

const StyledDot = styled("span")(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: "50%",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.short,
  }),
}));

// ----------------------------------------------------------------------

interface Props extends BoxProps {
  rounded?: boolean;
  sx?: SxProps<Theme>;
}

export default function CarouselDots(props?: Props): Record<string, any> {
  const rounded = props?.rounded ?? false;

  const sx = props?.sx;

  return {
    appendDots: (dots: React.ReactNode) => (
      <StyledRoot component="ul" rounded={rounded} sx={sx} {...props}>
        {dots}
      </StyledRoot>
    ),
    customPaging: () => (
      <Stack
        component="div"
        alignItems="center"
        justifyContent="center"
        sx={{ width: 1, height: 1 }}
      >
        <StyledDot
          sx={{
            bgcolor: "currentColor",
          }}
        />
      </Stack>
    ),
  };
}
