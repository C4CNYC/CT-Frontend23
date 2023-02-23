// @mui
import { TextField, TextFieldProps } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
  width?: number;
};

const CustomTextField = styled(TextField, {
  shouldForwardProp: (prop) => prop !== "width",
})<Props>(({ width, theme }): any => ({
  "& fieldset": {
    display: "none",
  },
  "& .MuiOutlinedInput-root": {
    width,
    border: `solid 1px ${alpha(theme.palette.grey[500], 0.32)}`,
    transition: theme.transitions.create(["box-shadow", "width"], {
      duration: theme.transitions.duration.shorter,
    }),
    "&.Mui-focused": {
      boxShadow: theme.customShadows.z20,
      ...(width && {
        [theme.breakpoints.up("sm")]: {
          width: width + 60,
        },
      }),
    },
  },
}));

export default CustomTextField;
