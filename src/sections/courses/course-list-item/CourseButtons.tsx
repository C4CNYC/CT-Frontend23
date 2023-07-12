import { Button, Link, Stack } from "@mui/material";

import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import { addAlpha } from "@utils";

interface Props {
  redirect: () => void;
  progress: number | null;
  courseId: string;
}

export default function CourseButtons({
  redirect,
  progress,
  courseId,
}: Props): React.ReactElement {
  return (
    <Stack direction="row" sx={{ gap: { xs: 1, sm: 3 }, pb: 3, pt: 2 }}>
      {progress && progress > 0 ? (
        <Button
          component={Link}
          href={`${STUDENT_PATH_DASHBOARD.codePanel.root}/${courseId}`}
          variant="outlined"
          sx={{
            p: "5px 15px",
            borderRadius: "25px",
            fontSize: "1rem",
            borderColor: "#D8476A",
            color: "#D8476A",
            whiteSpace: "nowrap",
            borderWidth: "2px",
            "&:hover": {
              border: "2px solid #D8476A",
              backgroundColor: addAlpha("#D8476A", 0.1),
            },
          }}
        >
          Continue 🙌🏾
        </Button>
      ) : (
        <Button
          onClick={redirect}
          variant="outlined"
          sx={{
            p: "5px 15px",
            borderRadius: "25px",
            fontSize: "1rem",
            borderColor: "#5ED0D5",
            color: "#5ED0D5",
            whiteSpace: "nowrap",
            borderWidth: "2px",
            "&:hover": {
              border: "2px solid #5ED0D5",
              backgroundColor: addAlpha("#5ED0D5", 0.1),
            },
          }}
        >
          Enroll Now 👊🏽
        </Button>
      )}
      <Button
        onClick={redirect}
        variant="outlined"
        sx={{
          p: "5px 15px",
          borderRadius: "25px",
          fontSize: "1rem",
          borderColor: "#364954",
          color: "#364954",
          whiteSpace: "nowrap",
          borderWidth: "2px",
          "&:hover": {
            border: "2px solid #364954",
            backgroundColor: addAlpha("#364954", 0.1),
          },
        }}
      >
        Explore
      </Button>
    </Stack>
  );
}
