import { Box, Button, Link } from "@mui/material";
import { PATH_PAGE } from "@routes/paths";
import { addAlpha } from "@ct-nx/utils";

interface Props {
  redirect: () => void;
  progress?: number | undefined;
  courseId: string;
}

export default function CourseButtons({
  redirect,
  progress,
  courseId,
}: Props): React.ReactElement {
  return (
    <Box sx={{ display: "flex", gap: { xs: 1, sm: 3 }, pb: 3, pt: 2 }}>
      {progress ? (
        <Button
          component={Link}
          href={`${PATH_PAGE.codePanel.root}/${courseId}`}
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
          Continue 🙌
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
          Enroll Now 🚀
        </Button>
      )}
    </Box>
  );
}
