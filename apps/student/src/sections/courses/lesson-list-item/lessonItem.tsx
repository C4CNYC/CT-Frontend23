import {
  Box,
  Button,
  Collapse,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import { useState } from "react";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { ILesson } from "src/redux/interfaces/content.interface";
import { addAlpha } from "@ct-nx/utils";
import CourseChip from "../course-list-item/CourseChip";
import LessonStatistics from "./LessonStatistics";

interface Props {
  data: ILesson;
}

export default function LessonItem({ data }: Props): React.ReactElement {
  const [open, setOpen] = useState<boolean>(false);
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
            variant="h5"
            gutterBottom
            sx={{
              textTransform: "uppercase",
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {data.name}
          </Typography>
        </Tooltip>
        <Collapse in={open} collapsedSize={50}>
          <Typography
            variant="subtitle1"
            sx={{ minHeight: "50px", whiteSpace: "normal" }}
          >
            {data.description}
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, py: 2 }}>
            {["html", "css", "js", "react"].map((el, i) => (
              <CourseChip key={i} text={el} />
            ))}
          </Box>
        </Collapse>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            "&:hover": { cursor: "pointer" },
          }}
          onClick={() => {
            setOpen(!open);
          }}
        >
          <Typography variant="subtitle1" sx={{ mt: 1 }}>
            See more
          </Typography>
          {open ? (
            <SlArrowUp style={{ marginBottom: "-10px" }} />
          ) : (
            <SlArrowDown style={{ marginBottom: "-10px" }} />
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: { xs: 2, sm: 2, md: 2 },
            pt: 3,
          }}
        >
          <Button
            variant="outlined"
            sx={{
              p: "5px 15px",
              borderRadius: "25px",
              fontSize: "1rem",
              borderColor: "#D8476A",
              color: "#D8476A",
              whiteSpace: "nowrap",
              borderWidth: "2px",
              "&:hover": {
                border: "2px solid #D8476A",
                backgroundColor: addAlpha("#D8476A", 0.1),
              },
            }}
          >
            Continue 🙌
          </Button>
        </Box>
      </Stack>
      <LessonStatistics progress={data?.progress ?? 0}/>
    </Paper>
  );
}
