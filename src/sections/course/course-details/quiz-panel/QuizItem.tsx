import { Box, Chip, Tooltip, Typography } from "@mui/material";

interface IQuizItemProps {
  name: string;
  description: string;
}

export default function QuizItem({
  name,
  description,
}: IQuizItemProps): React.ReactElement {
  return (
    <Tooltip
      title={
        <Box sx={{ p: 1 }}>
          <Typography variant="subtitle1" sx={{ color: "#FBDD3F" }}>
            {description}
          </Typography>
        </Box>
      }
      sx={{ background: "#000" }}
      placement="top-end"
    >
      <Chip
        label={name}
        sx={{
          color: "#C4C4C4",
          background: "transparent",
          fontWeight: 400,
          border: "1px solid #C4C4C4",
          "&:hover": {
            color: "#fff",
            border: "1px solid #C4C4C4",
            cursor: "pointer",
          },
          "& .MuiChip-label": {
            fontSize: "1.0rem",
          },
        }}
      />
    </Tooltip>
  );
}
