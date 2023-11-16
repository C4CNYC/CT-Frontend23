import LoginLayout from "@layouts/login/LoginLayout";
import SignInMain from "@sections/auth/sign-in";
import GuestGuard from "src/auth/GuestGuard";

export default function SignIn(): React.ReactElement {
  return (
    <GuestGuard>
      <LoginLayout>
        <SignInMain />
      </LoginLayout>
    </GuestGuard>
  );
}
