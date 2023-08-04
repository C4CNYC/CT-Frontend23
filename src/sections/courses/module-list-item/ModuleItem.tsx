import {
  Paper,
  Stack,
  Tooltip,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";

import ModuleStatistics from "./ModuleStatistics";

export default function ModuleItem({ data }: any): React.ReactElement {
  const theme = useTheme();
  return (
    <Paper
      elevation={5}
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: "25px",
        width: { xs: "100%", sm: "100%", md: "48%" },
      }}
    >
      <Stack
        sx={{
          justifyContent: "space-between",
          px: { xs: 2, sm: 3, md: 3 },
          py: { xs: 2, sm: 3, md: 3 },
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        <Tooltip title={<Typography sx={{ p: 1 }}>{data.name}</Typography>}>
          <Typography
            variant="h6"
            sx={{
              pb: 0.8,
              textTransform: "uppercase",
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {data.name}
          </Typography>
        </Tooltip>
        <Typography
          variant="subtitle2"
          sx={{
            height: { xs: "100px", sm: "150px" },
            overflowY: "auto",
            whiteSpace: "normal",
            "&::-webkit-scrollbar": {
              width: "0.3em",
            },
            "&::-webkit-scrollbar-track": {},
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: alpha(theme.palette.grey[600], 0.48),
              borderRadius: "2px",
            },
          }}
        >
          {data.description}
        </Typography>
      </Stack>
      <ModuleStatistics
        progress={data.progress ?? 0}
        totalProgress={data.total_progress ?? 0}
      />
    </Paper>
  );
}
