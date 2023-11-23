import { useRouter } from "next/router";

import { useSnackbar } from "notistack";

import { Button } from "@mui/material";

import { Iconify } from "@components";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import { useGetAssignmentListStudentQuery } from "src/redux/services/manager/assignments-student";

interface ILetsCodeBtnProps {
  isMini?: boolean;
}

export default function LetsCodeBtn({ isMini }: ILetsCodeBtnProps) {
  const { push, query } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const { data: assigments } = useGetAssignmentListStudentQuery(
    { class_id: query.id as string },
    { skip: !query.id }
  );

  return (
    <Button
      onClick={() => {
        // Now go to first quest
        if (!assigments?.data[0]) {
          enqueueSnackbar("No lesson to code", { variant: "warning" });
        } else {
          push(
            STUDENT_PATH_DASHBOARD.codePanel.workSpace(
              assigments?.data[0].courseid
            )
          );
        }
      }}
      variant="contained"
      sx={{
        mt: "24px",
        mx: 2,
        color: "#EE467A",
        bgcolor: "#FFF",
        boxShadow: " 0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        "&:hover": {
          color: "#FFF",
          bgcolor: "#EE467A",
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
              py: 1,
              fontSize: "24px",
              borderRadius: "50px",
              gap: 1,
            }),
      }}
    >
      {!isMini ? "👩‍💻 Let's Code" : ""}

      {isMini ? (
        <Iconify icon="mingcute:code-fill" width={25} height={25} />
      ) : (
        <Iconify icon="octicon:chevron-right-12" width={25} height={25} />
      )}
    </Button>
  );
}
