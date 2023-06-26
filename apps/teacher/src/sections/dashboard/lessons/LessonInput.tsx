import { InputBase, InputBaseProps } from "@mui/material";

export default function LessonInput({
  sx,
  ...other
}: InputBaseProps): React.ReactElement | null {
  return (
    <InputBase
      sx={{
        flexGrow: 1,
        "& .MuiInputBase-input": {
          py: 1,
          borderRadius: 1,
          typography: "h6",
          border: "solid 1px transparent",
          transition: (theme) => theme.transitions.create(["padding-left"]),
          "&:hover, &:focus": {
            pl: 1,
          },
        },
        ...sx,
      }}
      {...other}
    />
  );
}
