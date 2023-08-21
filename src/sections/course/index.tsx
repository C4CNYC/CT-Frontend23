import { Box, Container } from "@mui/material";

import { CustomBreadcrumbs, Scrollbar } from "@components";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import { BaseResponseInterface } from "@utils";
import { ICourseContent } from "src/redux/interfaces/content.interface";

import CourseInfo from "./CourseInfo";
import CourseLayaut from "./CourseLayaut";

interface ICourseMainProps {
  course: ICourseContent & BaseResponseInterface;
}

export default function CourseMain({
  course,
}: ICourseMainProps): React.ReactElement {
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        borderRadius: 3,
        px: "20px",
        pt: "35px",
        pb: "187px",
        background: "#ECF4FF",
      }}
    >
      <Container maxWidth={false} sx={{ maxWidth: "1922px" }}>
        <CustomBreadcrumbs
          links={[
            { name: "Dashboard", href: STUDENT_PATH_DASHBOARD.root },
            { name: "Catalog", href: STUDENT_PATH_DASHBOARD.courses.root },
          ]}
        />
        <CourseInfo
          name={course.name}
          description={course.description}
          cover={course.cover}
          duration={"9"}
          level={course.level}
          lessonsCount={course.units.reduce((total, unit) => {
            return total + unit.lessons.length;
          }, 0)}
        />
        <CourseLayaut course={course} />
      </Container>
    </Box>
  );
}
