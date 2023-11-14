import LoginLayout from "@layouts/login/LoginLayout";
import SingInMain from "@sections/auth/sing-in";
import GuestGuard from "src/auth/GuestGuard";

export default function SingIn(): React.ReactElement {
  return (
    <GuestGuard>
      <LoginLayout>
        <SingInMain />
      </LoginLayout>
    </GuestGuard>
  );
}
