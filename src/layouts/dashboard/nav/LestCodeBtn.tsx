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
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const { query } = useRouter();

  const { data: assigments } = useGetAssignmentListStudentQuery(
    { class_id: query.id as string },
    { skip: !query.id }
  );

  return (
    <Button
      onClick={() => {
        // Now go to first quest
        if (!assigments?.data[0]) {
          enqueueSnackbar("No course", { variant: "warning" });
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
