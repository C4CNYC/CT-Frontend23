import LoginLayout from "@layouts/login/LoginLayout";
import TeacherStepper from "@sections/on-boarding-register/teacher/TeacherStepper";
import GuestGuard from "src/auth/GuestGuard";

export default function TeacherOnBoarding(): React.ReactElement {
  return (
    <GuestGuard>
      <LoginLayout title="Hi, I’m Mumu." subtitle="So glad you’re here!">
        <TeacherStepper />
      </LoginLayout>
    </GuestGuard>
  );
}
