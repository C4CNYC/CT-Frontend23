import { Stack } from "@mui/material";

import AuthorsSection from "./AuthorsSection";
import BriefSection from "./BriefSection";
import LinksSection from "./LinksSection";
import SocialActivity from "./SocialActivity";
import TeacherToolbox from "./TeacherToolbox";
import QuizPanel from "./quiz-panel";

export default function ModuleSidebar(): React.ReactElement {
  return (
    <Stack width={350}>
      <SocialActivity likes={12000} rated={4300} certificate={2700} />
      <BriefSection
        lessons="6 lessons"
        grade="5th-10th Grade"
        level="Beginner"
        duration="3.5 Hr"
      />
      <AuthorsSection />
      <LinksSection />
      <QuizPanel lessons={[]} />
      <TeacherToolbox />
    </Stack>
  );
}
