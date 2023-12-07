import LoginLayout from "@layouts/login/LoginLayout";
import TeacherStepper from "@sections/on-boarding-register/teacher/TeacherStepper";
import GuestGuard from "src/auth/GuestGuard";
import { useTranslate } from "src/utils/translateHelper";

export default function TeacherOnBoarding(): React.ReactElement {
  const translate = useTranslate();

  return (
    <GuestGuard>
      <LoginLayout
        title={translate("login_mumu", { name: "Mumu" })}
        subtitle={translate("login_mumu_glad")}
      >
        <TeacherStepper />
      </LoginLayout>
    </GuestGuard>
  );
}
