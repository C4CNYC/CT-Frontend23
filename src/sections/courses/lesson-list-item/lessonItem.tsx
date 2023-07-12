import {
  Box,
  Paper,
  Stack,
  Tooltip,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";

import { ILesson } from "src/redux/interfaces/content.interface";

import CourseChip from "../course-list-item/CourseChip";
import LessonStatistics from "./LessonStatistics";

interface Props {
  data: ILesson;
}

export default function LessonItem({ data }: Props): React.ReactElement {
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
          py: { xs: 2, sm: 2, md: 2 },
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        <Tooltip title={<Typography sx={{ p: 1 }}>{data.name}</Typography>}>
          <Typography
            variant="h6"
            sx={{
              pb: 1,
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
          variant="subtitle1"
          sx={{
            height: { xs: "80px", sm: "100px" },
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

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, py: 2 }}>
          {["html", "css", "js", "react"].map((el, i) => (
            <CourseChip key={i} text={el} />
          ))}
        </Box>
      </Stack>
      <LessonStatistics progress={data?.progress ?? 0} />
    </Paper>
  );
}
