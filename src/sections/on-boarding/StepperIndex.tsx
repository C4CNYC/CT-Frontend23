import StepWizard from "react-step-wizard";
import CourseStep from "./course-step/CourseStep";
import FinishStep from "./finish-step/FinishStep";
import GroupStep from "./group-step/GroupStep";
import HelloStep from "./hello-step/HelloStep";
import IviteStep from "./invite-step/InviteStep";
import LanguageStep from "./language-step/LanguageStep";

export default function StepperIndex(): React.ReactElement {
  return (
    <StepWizard>
      <HelloStep />
      <LanguageStep />
      <CourseStep />
      <GroupStep />
      <IviteStep />
      <FinishStep />
    </StepWizard>
  );
}
