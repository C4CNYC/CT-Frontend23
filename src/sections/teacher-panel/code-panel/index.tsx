import { useRealTimeConnection } from "@hooks/useRealTimeConnection";
import { Box } from "@mui/system";
import { useAtom } from "jotai";

import { useRouter } from "next/router";
import { useEffect } from "react";
import { useGetLessonContentQuery } from "src/redux/services/manager/lesson-content-manager";
import { codeAtom } from "./atoms/code.atom";
import { globalCodePanelAtom } from "./atoms/global-code-panel.atom";
import { mobileTabManager } from "./atoms/mobile-tab-manager.atom";
import WorkSpace from "./work-space";
import SmallScreenTabs from "./work-space/tabs";

export const CodePanel = (): React.ReactElement => {
  const { query } = useRouter();
  const [, setGlobal] = useAtom(globalCodePanelAtom);
  const [, setCode] = useAtom(codeAtom);
  const { data: realTimeData } = useRealTimeConnection(
    query?.studentId as string
  );
  const [{ activeTab }, setTab] = useAtom(mobileTabManager);
  const [{ lessonId }] = useAtom(globalCodePanelAtom);
  const { data } = useGetLessonContentQuery(
    {
      lessonId,
    },
    { skip: !lessonId }
  );

  useEffect(() => {
    setCode((prev) => ({
      code: realTimeData?.code ?? prev.code,
      language: realTimeData?.language ?? prev.language,
    }));

    setGlobal((prev) => ({
      ...prev,
      lessonId: realTimeData?.lessonId ?? "",
      slideIndex: realTimeData?.slideIndex ?? 0,
    }));
  }, [realTimeData]);

  if (!query?.studentId) return <Box>PLS CHOSE STUDENT</Box>;

  return (
    <Box>
      <Box display="flex" justifyContent="center" p="10px" bgcolor="#EAFEFC">
        <SmallScreenTabs
          index={activeTab}
          onChangeIndex={(value) => {
            setTab({ activeTab: value });
          }}
        />
      </Box>
      <WorkSpace data={data ?? []} />
    </Box>
  );
};
