import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { useAtom } from "jotai";

import { CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";

import { useRealTimeConnection } from "src/hooks/useRealTimeConnection";
import { useGetLessonContentQuery } from "src/redux/services/manager/lesson-content-manager";

import { globalCodePanelAtom } from "./atoms/global-code-panel.atom";
import { mobileTabManager } from "./atoms/mobile-tab-manager.atom";
import WorkSpace from "./work-space";
import SmallScreenTabs from "./work-space/tabs";

export const CodePanel = (): React.ReactElement => {
  const { query } = useRouter();
  const [loading, setLoading] = useState(false);
  const [, setGlobal] = useAtom(globalCodePanelAtom);
  const { data: realTimeData } = useRealTimeConnection(
    query?.id as string
  );
  const [{ activeTab }, setTab] = useAtom(mobileTabManager);
  const [{ lessonId }] = useAtom(globalCodePanelAtom);
  const { data, isFetching } = useGetLessonContentQuery(
    {
      lessonId,
    },
    { skip: !lessonId }
  );

  useEffect(() => {
    setGlobal((prev) => ({
      ...prev,
      lessonId: realTimeData?.lessonId ?? "",
      slideIndex: realTimeData?.slideIndex ?? 0,
    }));
  }, [realTimeData]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [query]);

  if (loading) {
    return (
      <Box>
        <CircularProgress />
      </Box>
    );
  }

  if (!query?.id) {
    return (
      <Box>
        <Typography
          mt="40px"
          textAlign="center"
          textTransform="uppercase"
          color="#c4c4c4"
          variant="h6"
        >
          PLS CHOSE STUDENT
        </Typography>
      </Box>
    );
  }

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
      <WorkSpace isFetching={isFetching} data={data ?? []} />
    </Box>
  );
};
