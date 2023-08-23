import { Box, Chip, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/system";

interface ICourseDescriptionProps {
  name: string;
  desc: string;
  index: number;
}

export default function CourseDescription({
  name,
  desc,
}: ICourseDescriptionProps): React.ReactElement {
  const theme = useTheme();

  return (
    <Stack
      direction="row"
      sx={{
        gap: 4,
        justifyContent: "space-between",
        [theme.breakpoints.down(1400)]: {
          flexWrap: "wrap",
          gap: 2,
        },
      }}
    >
      <Box>
        <Typography variant="h3">{name}</Typography>
        <Typography variant="h5" fontWeight={400} maxWidth={550}>
          {desc}
        </Typography>
        <Stack direction="row" gap={2} my={2}>
          <Chip
            label="HTML"
            sx={{
              background: "transparent",
              border: "1px solid #919EAB52",
              borderRadius: 1,
            }}
          />
          <Chip
            label="CSS"
            sx={{
              background: "transparent",
              border: "1px solid #919EAB52",
              borderRadius: 1,
            }}
          />
          <Chip
            label="BASICS"
            sx={{
              background: "transparent",
              border: "1px solid #919EAB52",
              borderRadius: 1,
            }}
          />
          <Chip
            label="AUTO-CHECKED"
            sx={{
              background: "transparent",
              border: "1px solid #919EAB52",
              borderRadius: 1,
            }}
          />
        </Stack>
      </Box>
    </Stack>
  );
}
