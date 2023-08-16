import { useRouter } from "next/router";

import { useAtom } from "jotai";
import { useSnackbar } from "notistack";
import { BsChatLeftTextFill } from "react-icons/bs";

import { Button } from "@mui/material";

import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import { globalCodePanelAtom } from "@sections/code-panel/atoms/global-code-panel.atom";
import { useGetCourseQuery } from "src/redux/services/manager/courses-student";

interface ILetsCodeBtnProps {
  isMini?: boolean;
}

export default function LetsCodeBtn({ isMini }: ILetsCodeBtnProps) {
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [{ courseId, unitId, lessonId }] = useAtom(globalCodePanelAtom);
  const { data } = useGetCourseQuery({}, { skip: Boolean(courseId) });

  return (
    <Button
      onClick={() => {
        if (!courseId || !unitId || !lessonId) {
          if (data?.data.length) {
            enqueueSnackbar("No course", { variant: "warning" });
          } else {
            push(
              `/${STUDENT_PATH_DASHBOARD.codePanel.workSpace(
                data?.data[0].course_id as string
              )}`
            );
          }
        } else {
          push(
            `/${STUDENT_PATH_DASHBOARD.codePanel.workSpace(
              courseId
            )}?${unitId}&${lessonId}`
          );
        }
      }}
      variant="contained"
      sx={{
        borderRadius: !isMini ? "50px" : 1,
        py: "15px",
        mt: !isMini ? 4 : 1,
        mb: 1,
        fontSize: "1rem",
        mx: isMini ? 1 : 0,
      }}
    >
      {!isMini ? "Lets Code" : "Code"}
      {!isMini ? (
        <BsChatLeftTextFill
          size="16px"
          color="#fff"
          style={{ marginLeft: "10px" }}
        />
      ) : null}
    </Button>
  );
}
