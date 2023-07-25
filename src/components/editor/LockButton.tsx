import { useAtom } from "jotai";
import { AiFillLock, AiFillUnlock } from "react-icons/ai";
import { FaSave } from "react-icons/fa";

import Button from "@mui/material/Button";

import { multimediaLockedAtom } from "@sections/dashboard/lessons/LessonStep/LessonStepContent/lesson-multimedia-atom";

export function LockButton(): JSX.Element {
  const [locked, setLocked] = useAtom(multimediaLockedAtom);

  return (
    <Button
      variant="outlined"
      key="left"
      onClick={() => {
        setLocked(!locked);
      }}
      sx={{
        flexShrink: 0,
        ml: "auto!important",
        maxHeight: "40px",
        borderRadius: "20px",
        border: "2px solid #75CF6D",
        color: "#75CF6D",
        gap: 1,
        "&:hover": {
          border: "2px solid #75CF6D",
        },
      }}
    >
      {locked ? <AiFillLock size={22} /> : <AiFillUnlock size={22} />}
    </Button>
  );
}
