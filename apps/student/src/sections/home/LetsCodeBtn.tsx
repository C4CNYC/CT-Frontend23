import { Button } from "@mui/material";
import { PATH_PAGE } from "@routes/paths";
import { globalCodePanelAtom } from "@sections/code-panel/atoms/global-code-panel.atom";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { BsChatLeftTextFill } from "react-icons/bs";

interface Props {
  isMini?: boolean;
}

export default function LetsCodeBtn({ isMini }: Props) {
  const { push } = useRouter();
  const [{ courseId, unitId, lessonId }] = useAtom(globalCodePanelAtom);
  console.log({ courseId, unitId, lessonId });
  return (
    <Button
      onClick={() => {
        if (courseId && unitId && lessonId) {
          push(
            `${PATH_PAGE.codePanel.workSpace(courseId)}?${unitId}&${lessonId}}`
          );
        } else {
          push(PATH_PAGE.courses.root);
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
