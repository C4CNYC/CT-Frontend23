import { useRouter } from "next/router";

import { useAtom } from "jotai";
import { BsChatLeftTextFill } from "react-icons/bs";

import { Button } from "@mui/material";

import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import { globalCodePanelAtom } from "@sections/code-panel/atoms/global-code-panel.atom";

interface Props {
  isMini?: boolean;
}

export default function LetsCodeBtn({ isMini }: Props) {
  const { push } = useRouter();
  const [{ courseId, unitId, lessonId }] = useAtom(globalCodePanelAtom);
  return (
    <Button
      onClick={() => {
        push(
          `/${STUDENT_PATH_DASHBOARD.codePanel.workSpace(
            courseId
          )}?${unitId}&${lessonId}`
        );
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
