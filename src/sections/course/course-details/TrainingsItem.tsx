import Link from "next/link";
import { useRouter } from "next/router";

import { AiOutlineClockCircle } from "react-icons/ai";

import { Button, Stack, Typography } from "@mui/material";

import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import { ILessonCurrent } from "src/redux/interfaces/content.interface";

interface ITrainingsItemProps {
  lesson: ILessonCurrent;
  index: number;
  unitId: string;
}

export default function TrainingsItem({
  lesson,
  index,
  unitId,
}: ITrainingsItemProps): React.ReactElement {
  const courseId = useRouter().query.id;

  return (
    <Stack
      sx={{
        borderRadius: 2,
        p: 2,
        bgcolor: "#F8FFF7",
        minHeight: "150px",
        maxWidth: "600px",
      }}
    >
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Typography variant="h4">
          {index + 1}. {lesson.name}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            whiteSpace: "nowrap",
            ml: "10px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <AiOutlineClockCircle size={20} style={{ marginRight: "8px" }} />
          20 mins
        </Typography>
      </Stack>
      <Typography variant="body1" mb={3}>
        {lesson.description}
      </Typography>
      <Button
        component={Link}
        href={`${STUDENT_PATH_DASHBOARD.codePanel.workSpace(
          courseId as string
        )}?${unitId}&${lesson.id}`}
        variant="outlined"
        sx={{
          color: "#364954",
          alignSelf: "flex-end",
          fontWeight: 400,
          p: "0px 20px",
          fontSize: "1.2rem",
        }}
      >
        START
      </Button>
    </Stack>
  );
}
