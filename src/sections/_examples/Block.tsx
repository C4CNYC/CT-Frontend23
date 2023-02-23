// @mui
import { Box, CardHeader, Paper, SxProps, Typography } from "@mui/material";
import { alpha, Theme } from "@mui/material/styles";

// ----------------------------------------------------------------------

interface BlockProps {
  title?: string;
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

export function Block({
  title,
  sx,
  children,
}: BlockProps): React.ReactElement | null {
  return (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: 1.5,
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
      }}
    >
      {title && <CardHeader title={title} />}

      <Box
        sx={{
          p: 5,
          minHeight: 180,
          ...sx,
        }}
      >
        {children}
      </Box>
    </Paper>
  );
}

// ----------------------------------------------------------------------

interface LabelProps {
  title: string;
}

export function Label({ title }: LabelProps): React.ReactElement | null {
  return (
    <Typography
      variant="overline"
      component="p"
      gutterBottom
      sx={{ color: "text.secondary" }}
    >
      {title}
    </Typography>
  );
}
