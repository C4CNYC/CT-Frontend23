import { Stack, useMediaQuery, useTheme, Typography } from "@mui/material";

import AuthorsSection from "./AuthorsSection";
import BriefSection from "./BriefSection";
import TeacherToolbox from "./TeacherToolbox";
import CollasedItem from "./components/CollasedItem";
import QuizPanel from "./quiz-panel";

interface IModuleSidebarProps {
  description: string,
  level: string,
  lessonCount: string,
  grade: string,
  duration: string | null,
}

export default function ModuleSidebar({
    description,
    level,
    lessonCount,
    duration,
    grade,
  }: IModuleSidebarProps): React.ReactElement {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(1130));
  return (
    <Stack width={350} gap={2} m={isMobile ? "0 auto" : ""}>
      <CollasedItem title="Author & Ranking">
        <AuthorsSection />
      </CollasedItem>
      <CollasedItem title="The Brief">
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
      <CollasedItem title="Who is this for">
        <Typography
          sx={{
            p: 2,
            borderRadius: 3,
            bgcolor: theme.palette.mode === "light" ? "#F8F8F8" : theme.palette.background.paper
          }}
        >
          {description}
        </Typography>
      </CollasedItem>
      <QuizPanel lessons={[]} />
      <CollasedItem title="Teacher Toolbox">
        <TeacherToolbox />
      </CollasedItem>
    </Stack>
  );
}
