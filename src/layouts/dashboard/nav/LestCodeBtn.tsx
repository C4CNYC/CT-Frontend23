import { useRouter } from "next/router";
import { useMemo } from "react";

import { useSnackbar } from "notistack";

import { Button } from "@mui/material";
import { useTheme } from "@mui/system";

import { Iconify } from "@components";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import { useLocales } from "src/locales";
import { useGetAssignmentListStudentQuery } from "src/redux/services/manager/assignments-student";

import { getLetsCodeBtnSx } from "./constants";

interface ILetsCodeBtnProps {
  isMini?: boolean;
}

export default function LetsCodeBtn({ isMini }: ILetsCodeBtnProps) {
  const { translate } = useLocales();
  const { push, query } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const letsCodeBtnSx = useMemo(
    () => getLetsCodeBtnSx(theme, isMini),
    [theme, isMini]
  );

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
      sx={letsCodeBtnSx}
    >
      {!isMini ? `👩‍💻 ${translate("sidebar_menu_code_btn")}` : ""}

      {isMini ? (
        <Iconify icon="mingcute:code-fill" width={25} height={25} />
      ) : (
        <Iconify icon="octicon:chevron-right-12" width={25} height={25} />
      )}
    </Button>
  );
}
