import NextLink from "next/link";
import { useMemo } from "react";

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
import { useTheme } from "@mui/system";

import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import { useTranslate } from "src/utils/translateHelper";

import {
  QUEST_DIVIDER,
  QUEST_LINK_SX,
  getQuestCardWraperSx,
} from "./constants";

interface IQuestRatingProps {
  courseName: string;
  courseId: string;
  progress: number;
}

export default function QuestRating({
  courseId,
  courseName,
  progress,
}: IQuestRatingProps): React.ReactElement {
  const translate = useTranslate();
  const theme = useTheme();
  const cardWrapperSx = useMemo(() => getQuestCardWraperSx(theme), [theme]);

  return (
    <>
      <Card sx={cardWrapperSx}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Stack gap={1}>
            <Tooltip
              title={
                <Typography variant="body2">
                  This content has been linked to this quest and should be
                  completed.
                </Typography>
              }
            >
              <Typography
                display="inline-flex"
                alignItems="center"
                variant="body1"
                sx={{ cursor: "pointer" }}
              >
                {translate("course")}
                <BsFillInfoCircleFill style={{ marginLeft: "5px" }} />
              </Typography>
            </Tooltip>
            <Typography variant="h4">{courseName}</Typography>
          </Stack>
          <Stack direction="row" alignItems="center">
            <Typography variant="h6">{progress} %</Typography>
            <Divider orientation="vertical" flexItem sx={QUEST_DIVIDER} />
            <Link
              component={NextLink}
              href={STUDENT_PATH_DASHBOARD.courses.course(courseId)}
              underline="none"
              typography="h4"
              sx={QUEST_LINK_SX}
            >
              {translate("open")}
              <RiShareBoxFill size={22} />
            </Link>
          </Stack>
        </Box>
      </Card>
    </>
  );
}
