import { Box, Chip, Skeleton, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/system";

interface IModuleDescriptionProps {
  name?: string;
  desc?: string;
  isLoading: boolean;
}

export default function ModuleDescription({
  name,
  desc,
  isLoading,
}: IModuleDescriptionProps): React.ReactElement {
  const theme = useTheme();

  return (
    <Stack
      direction="row"
      sx={{
        width: "100%",
        gap: 4,
        justifyContent: "space-between",
        [theme.breakpoints.down(1400)]: {
          flexWrap: "wrap",
          gap: 2,
        },
      }}
    >
      <Stack mt={3} width="100%">
        {isLoading || !name || !desc ? (
          <>
            <Skeleton
              variant="rounded"
              width="100%"
              height="176px"
              sx={{ maxWidth: "550px" }}
            />
          </>
        ) : (
          <>
            <Typography variant="h4">{name}</Typography>
            <Typography variant="h6" fontWeight={400} maxWidth={550}>
              {desc}
            </Typography>
          </>
        )}

        <Stack direction="row" gap={2} my={2} flexWrap="wrap">
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
      </Stack>
    </Stack>
  );
}
