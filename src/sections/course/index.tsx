import { useRouter } from "next/router";

import { AiOutlineMinus } from "react-icons/ai";
import { MdKeyboardArrowLeft } from "react-icons/md";

import { Box, Button, Container, Typography } from "@mui/material";

import { Scrollbar } from "@components";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import { BaseResponseInterface } from "@utils";
import { ICourseContent } from "src/redux/interfaces/content.interface";

import CourseLayaut from "./CourseLayaut";

interface ICourseMainProps {
  course: ICourseContent & BaseResponseInterface;
}

export default function CourseMain({
  course,
}: ICourseMainProps): React.ReactElement {
  const { push } = useRouter();

  return (
    <Scrollbar>
      <Box
        sx={{
          position: "relative",
          minHeight: "100vh",
          width: "100%",
          borderRadius: 2,
          px: "20px",
          pt: "35px",
          pb: "187px",
          background:
            'no-repeat url("/assets/projects/btn_bg.svg")  top -169px right -197px / 523px 323px, #ECF4FF',
        }}
      >
        <Container maxWidth={false} sx={{ maxWidth: "1922px" }}>
          <Button
            onClick={() => {
              push(STUDENT_PATH_DASHBOARD.courses.root);
            }}
            sx={{
              color: "#364954",
              mb: "10px",
            }}
          >
            <MdKeyboardArrowLeft size="20px" />
            <AiOutlineMinus size="20px" style={{ marginLeft: "-8px" }} />
            BACK TO LIST
          </Button>
          <Typography variant="h4">{course?.name}</Typography>
          <Typography variant="h6" fontWeight={400} maxWidth="600px">
            {course?.description}
          </Typography>
          <CourseLayaut course={course} />
        </Container>
      </Box>
    </Scrollbar>
  );
}
