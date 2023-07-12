import { useSettingsContext } from "@components";
import { Container, Stack, Typography } from "@mui/material";
import CourseList from "@sections/courses/CourseList";
import GuestGuard from "src/auth/GuestGuard";

export default function PublicCourses(): React.ReactElement {
  const { themeStretch } = useSettingsContext();

  return (
    <GuestGuard>
      <Container maxWidth={themeStretch ? false : "lg"}>
        <Stack sx={{ pt: 10 }}>
          <Typography variant="h3" sx={{ pb: 4 }}>
            Courses
          </Typography>
          <CourseList publicPage={true} />
        </Stack>
      </Container>
    </GuestGuard>
  );
}
