import { useRouter } from "next/router";
import { MouseEvent } from "react";

import { Button, Link, Stack } from "@mui/material";

import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import { useTranslate } from "src/utils/translateHelper";

import {
  CONTINUE_COURSE_BTN_SX,
  ENROLL_COURSE_BTN_SX,
  EXPLORE_COURSE_BTN_SX,
} from "./constants";

interface Props {
  redirect: () => void;
  progress: number | null;
  courseId: string;
}

export default function CourseButtons({
  redirect,
  progress,
  courseId,
}: Props): React.ReactElement {
  const { push } = useRouter();
  const translate = useTranslate();
  return (
    <Stack direction="row" sx={{ gap: { xs: 1, sm: 3 }, pb: 3, pt: 2 }}>
      {progress && progress > 0 ? (
        <Button
          component={Link}
          onClick={async (e) => {
            e.stopPropagation();
            e.preventDefault();
            await push(`${STUDENT_PATH_DASHBOARD.codePanel.root}/${courseId}`);
          }}
          variant="outlined"
          sx={CONTINUE_COURSE_BTN_SX}
        >
          {translate("actions_continue")} 🙌🏾
        </Button>
      ) : (
        <Button onClick={redirect} variant="outlined" sx={ENROLL_COURSE_BTN_SX}>
          {translate("actions_enroll_now")} 👊🏽
        </Button>
      )}
      <Button onClick={redirect} variant="outlined" sx={EXPLORE_COURSE_BTN_SX}>
        {translate("actions_explore")}
      </Button>
    </Stack>
  );
}
