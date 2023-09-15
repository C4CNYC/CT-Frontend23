import { useRouter } from "next/router";

import { useAtom } from "jotai";
import { useSnackbar } from "notistack";

import { Button } from "@mui/material";

import { Iconify } from "@components";
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
              `${STUDENT_PATH_DASHBOARD.codePanel.workSpace(
                data?.data[0].course_id as string
              )}`
            );
          }
        } else {
          push(
            `${STUDENT_PATH_DASHBOARD.codePanel.workSpace(
              courseId
            )}?${unitId}&${lessonId}`
          );
        }
      }}
      variant="contained"
      sx={{
        bgcolor: "#43D4DD",
        "&:hover": {
          color: "#43D4DD",
          bgcolor: "rgba(67, 211, 221, .3)",
          boxShadow:
            "0px 3px 1px -2px rgba(67, 211, 221, 0.2), 0px 2px 2px 0px rgba(67, 211, 221, 0.14), 0px 1px 5px 0px rgba(67, 211, 221, 0.12)",
        },
        ...(isMini
          ? {
              borderRadius: "50%",
              m: "8px auto 16px",
              width: "35px",
              height: "35px",
              minWidth: "0",
              px: 1,
            }
          : {
              py: 1.5,
              fontSize: "1rem",
              borderRadius: "50px",
              gap: 1,
            }),
      }}
    >
      {!isMini ? "Let's Code" : ""}

      {isMini ? (
        <Iconify icon="mingcute:code-fill" width={25} height={25} />
      ) : (
        <Iconify icon="octicon:chevron-right-12" width={25} height={25} />
      )}
    </Button>
  );
}
