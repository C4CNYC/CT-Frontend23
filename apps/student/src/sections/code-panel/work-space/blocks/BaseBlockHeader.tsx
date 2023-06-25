import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

interface Props {
  title: string;
  icon: React.ReactElement;
}

export default function BaseBlockHeader({
  title,
  icon,
}: Props): React.ReactElement {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up(1000));
  return (
    <Box
      sx={{
        display: isDesktop ? "flex" : "none",
        width: "100%",
        background: "#fff",
        alignItems: "center",
        gap: 2,
        px: 1,
        py: 0.5,
        borderBottom: "2px solid #5FD0D5",
        zIndex: 2,
        position: "relative",
      }}
    >
      {icon}
      <Typography
        variant="subtitle1"
        sx={{ color: "#D9D9E2", textTransform: "capitalize" }}
      >
        {title}
      </Typography>
    </Box>
  );
}
