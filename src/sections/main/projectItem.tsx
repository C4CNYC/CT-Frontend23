import { AiOutlineArrowRight } from "react-icons/ai";

import { 
  Grid, 
  Link, 
  Paper, 
  Button, 
  Tooltip, 
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

import { 
  Image,
  Iconify, 
} from "@components";

import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import { ICourseElement } from "src/redux/interfaces/content.interface";

interface Props {
  course?: ICourseElement;
}

export default function ProjectItem({
  course,
}: Props): React.ReactElement | null {
  if (!course) return null;

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          p: 2,
          borderRadius: 2,
          width: "330px",
        }}
      >
        <Box
          sx={{
            position: "relative",
            borderBottom: "1px solid rgba(145, 158, 171, 0.24)",
            pb: 2,
            mb: 2,
          }}
        >
          <Image
            src={course.cover ?? "/assets/courses/tiger.png"}
            alt={course.cover ?? ""}
            ratio="16/9"
            style={{ objectFit: "contain", padding: 2 }}
          />
        </Box>
        <Typography variant="h6" gutterBottom>
          {course.name}
        </Typography>
        <Tooltip
          title={
            course.description.length > 120 ? (
              <Typography variant="body2" p={1}>
                {course.description}
              </Typography>
            ) : (
              ""
            )
          }
        >
          <Typography
            overflow="clip"
            variant="body2"
            sx={{
              height: "70px",
              display: "-webkit-box !important",
              "-webkit-line-clamp": "3",
              "-webkit-box-orient": "vertical",
              whiteSpace: "normal",
            }}
            textOverflow="ellipsis"
          >
            {course.description}
          </Typography>
        </Tooltip>
        <Grid
          container
          sx={{ mb: 3, mt: 1, display: "flex", flexDirection: "column" }}
        >
          <Grid item sx={{ display: "flex", alignItems: "center" }}>
            <Iconify color="gray" width="20px" icon="mingcute:computer-fill" />
            <Typography
              variant="body2"
              sx={{ display: "inline-block", color: "gray", ml: 1 }}
            >
              {course.total_lessons} lessons
            </Typography>
          </Grid>
          <Button
            component={Link}
            href={`${STUDENT_PATH_DASHBOARD.courses.course(course?.id)}`}
            size="small"
            endIcon={<AiOutlineArrowRight color="gray" size={16} />}
            sx={{
              width: "110px",
              pr: "10px",
              mt: 1,
              "&:hover": {
                background: "none",
              },
              alignItems: "center",
            }}
          >
            <Typography
              variant="body2"
              sx={{ display: "inline-block", color: "gray" }}
            >
              See more
            </Typography>
          </Button>
        </Grid>
        <Button
          component={Link}
          href={`${STUDENT_PATH_DASHBOARD.codePanel.workSpace(course?.id)}`}
          sx={{
            border: "1px solid #02D3D7",
            borderRadius: "100px",
            width: "100%",
            padding: "12px 0",
            color: "#02D3D7",
            fontSize: "13px",
          }}
          startIcon={
            <Iconify
              width="25px"
              color="#02D3D7"
              icon="mdi:briefcase-variant-outline"
            />
          }
        >
          Start Coding
        </Button>
      </Paper>
    </>
  );
}
