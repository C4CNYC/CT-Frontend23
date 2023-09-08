import { useContext } from "react";

import { AiFillLock, AiFillUnlock } from "react-icons/ai";

import Button from "@mui/material/Button";

import { LessonContentContext } from "@sections/dashboard/lessons/LessonStep/LessonStepContent/LessonContent.context";

export function LockButton(): JSX.Element {
  const { locked, lockedHandler } = useContext(LessonContentContext);

  return (
    <Button
      variant="outlined"
      key="left"
      onClick={() => {
        lockedHandler(!locked);
      }}
      sx={{
        flexShrink: 0,
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
      {!locked ? <AiFillLock size={22} /> : <AiFillUnlock size={22} />}
    </Button>
  );
}
