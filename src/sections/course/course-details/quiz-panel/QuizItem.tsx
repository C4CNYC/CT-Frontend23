import { Box, Chip, Tooltip, Typography } from "@mui/material";

interface Props {
  name: string;
  description: string;
}

export default function QuizItem({
  name,
  description,
}: Props): React.ReactElement {
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
      placement="right-start"
    >
      <Chip
        label={name}
        sx={(theme) => ({
          color: "#C4C4C4",
          background: "transparent",
          p: "0 10px",
          fontWeight: 400,
          border: "1px solid #C4C4C4",
          height: "24px",
          ml: "5px",
          mb: "8px",
          "& .MuiChip-label": {
            fontSize: "16px",
          },
          "&:hover": {
            color: "#fff",
            border: "1px solid #C4C4C4",
            cursor: "pointer",
          },
          [theme.breakpoints.down(1500)]: {
            "& .MuiChip-label": {
              fontSize: "14px",
            },
            p: "0 5px",
          },
          [theme.breakpoints.down(600)]: {
            "& .MuiChip-label": {
              fontSize: "10px",
            },
          },
        })}
      />
    </Tooltip>
  );
}
