import LoginLayout from "@layouts/login/LoginLayout";
import StudentStepper from "@sections/on-boarding-register/student/StudentStepper";
import GuestGuard from "src/auth/GuestGuard";

export default function StudentOnBoarding(): React.ReactElement {
  return (
    <GuestGuard>
      <LoginLayout title="Hi, I’m Mumu." subtitle="So glad you’re here!">
        <StudentStepper />
      </LoginLayout>
    </GuestGuard>
  );
}
