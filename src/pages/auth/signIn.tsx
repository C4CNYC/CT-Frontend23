import { useRouter } from "next/router";
import { useEffect } from "react";

import LoginLayout from "@layouts/login/LoginLayout";
import SignInMain from "@sections/auth/sign-in";
import GuestGuard from "src/auth/GuestGuard";

export default function SignIn(): React.ReactElement {
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/student/code-panel/[id]").catch((e) => {
      console.warn("Could not prefetch code panel", e);
    });
  }, [router]);

  return (
    <GuestGuard>
      <LoginLayout>
        <SignInMain />
      </LoginLayout>
    </GuestGuard>
  );
}
