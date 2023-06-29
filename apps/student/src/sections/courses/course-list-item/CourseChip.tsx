import { Chip } from "@mui/material";

interface Props {
  text: string;
  sx?: Record<string, unknown>;
}

export default function CourseChip({ text, sx }: Props): React.ReactElement {
  return (
    <Chip
      label={text}
      sx={{
        background: "#919EAB52",
        color: "#364954",
        fontWeight: 700,
        textTransform: "uppercase",
        p: "0 5px",
        ...sx,
      }}
    />
  );
}
