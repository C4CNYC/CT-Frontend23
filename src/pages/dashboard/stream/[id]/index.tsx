import SchoolDashboardLayout from "@layouts/dashboard/SchoolDashboardLayout";
import StreamPanel from "@sections/stream-panel";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRemoveStreamMutation } from "src/redux/services/manager/stream-manager";

// ----------------------------------------------------------------------

ClassSettingPage.getLayout = (page: React.ReactElement) => (
  <SchoolDashboardLayout isFullScreen>{page}</SchoolDashboardLayout>
);

// ----------------------------------------------------------------------

export default function ClassSettingPage(): React.ReactElement {
  const { query } = useRouter();
  const [removeStream] = useRemoveStreamMutation();

  const onRemove = (): void => { removeStream({ id: query?.id as string }) };

  useEffect(() => {
    window.addEventListener("beforeunload", onRemove);

    return () => {
      onRemove();
      window.removeEventListener("beforeunload", onRemove)
    }
  }, [])

  return <StreamPanel />;
}
