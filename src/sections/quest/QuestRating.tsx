import NextLink from "next/link";

import { BsFillInfoCircleFill } from "react-icons/bs";
import { RiShareBoxFill } from "react-icons/ri";

import {
  Box,
  Card,
  Divider,
  Link,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";

interface IQuestRatingProps {
  courseName: string;
  courseId: string;
}

export default function QuestRating({
  courseId,
  courseName,
}: IQuestRatingProps): React.ReactElement {
  return (
    <>
      <Card
        sx={{ mt: 3, p: { xs: "5px 0px", sm: "15px 20px", md: "15px 20px" } }}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Stack gap={1}>
            <Tooltip title="some">
              <Typography
                display="inline-flex"
                alignItems="center"
                variant="body1"
              >
                Course <BsFillInfoCircleFill style={{ marginLeft: "5px" }} />
              </Typography>
            </Tooltip>
            <Typography variant="h4">Course Name</Typography>
          </Stack>
          <Stack direction="row" alignItems="center">
            <Typography variant="h6">82%</Typography>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ mx: 2, borderStyle: "dashed", borderRightWidth: "2px" }}
            />
            <Link
              component={NextLink}
              href={STUDENT_PATH_DASHBOARD.courses.root}
              underline="none"
              typography="h4"
              sx={{
                color: "#EE467A",
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              Open
              <RiShareBoxFill size={22} />
            </Link>
          </Stack>
        </Box>
      </Card>
    </>
  );
}
