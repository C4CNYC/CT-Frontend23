import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";

import { useTranslate } from "src/utils/translateHelper";

import AuthorsSection from "./AuthorsSection";
import BriefSection from "./BriefSection";
import TeacherToolbox from "./TeacherToolbox";
import CollasedItem from "./components/CollasedItem";
import QuizPanel from "./quiz-panel";

interface IModuleSidebarProps {
  description: string;
  level: string;
  lessonCount: string;
  grade: string;
  duration: string | null;
  teacherSlides?: string;
  lessonPlans?: string;
  teacherForum?: string;
  certificate: number;
  likes: number;
  rated: number;
}

export default function ModuleSidebar({
  description,
  level,
  lessonCount,
  duration,
  grade,
  certificate,
  likes,
  rated,
  teacherSlides,
  teacherForum,
  lessonPlans,
}: IModuleSidebarProps): React.ReactElement {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(1130));
  const translate = useTranslate();

  return (
    <Stack width={350} gap={2} m={isMobile ? "0 auto" : ""}>
      <CollasedItem title={translate("courses_author_and_ranking")}>
        <AuthorsSection
          certificate={certificate ?? 0}
          likes={likes ?? 0}
          rated={rated ?? 0}
        />
      </CollasedItem>
      <CollasedItem title={translate("courses_brief")}>
        <BriefSection
          lessons={lessonCount}
          grade={grade}
          level={level}
          duration={duration ?? "20 min"}
        />
      </CollasedItem>
      {/* <CollasedItem title="What you’ll build">
        <></>
      </CollasedItem> */}
      {/* <CollasedItem title="Sample Certificate">
        <></>
      </CollasedItem> */}
      <CollasedItem title={translate("courses_course_who_is_this_for")}>
        <Typography
          sx={{
            p: 2,
            borderRadius: 3,
            bgcolor:
              theme.palette.mode === "light"
                ? "#F8F8F8"
                : theme.palette.background.paper,
          }}
        >
          {description}
        </Typography>
      </CollasedItem>
      <QuizPanel lessons={[]} />
      <CollasedItem title={translate("courses_teacher_toolbox")}>
        <TeacherToolbox
          teacherForum={teacherForum}
          teacherSlides={teacherSlides}
          lessonPlans={lessonPlans}
        />
      </CollasedItem>
    </Stack>
  );
}
