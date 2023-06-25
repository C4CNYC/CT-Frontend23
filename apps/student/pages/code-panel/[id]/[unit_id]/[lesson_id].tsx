import { EmptyContent } from "@ct-nx/components";
import { useOnlineConnection } from "@ct-nx/hooks";
import { useRealTimeConnection } from "@hooks/useRealTimeConnection";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { PATH_PAGE } from "@routes/paths";
import { globalCodePanelAtom } from "@sections/code-panel/atoms/global-code-panel.atom";
import BottomBar from "@sections/code-panel/bottom-bar";
import { CodePanelContext } from "@sections/code-panel/context/CodePanel.context";
import SkeletonCodePanel from "@sections/code-panel/skeleton";
import TopPanel from "@sections/code-panel/top-bar";
import ChatPopup from "@sections/code-panel/top-bar/nav-bar/options/ChatPopUp";
import { getNextLessonId } from "@sections/code-panel/utils/navigation";
import WorkSpace, { SupportedLang } from "@sections/code-panel/work-space";
import { useAtom } from "jotai";
import _ from "lodash";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { useAuthContext } from "src/auth/useAuthContext";
import { useGetChallangesQuery } from "src/redux/services/student/challenges-student";
import {
  useGetLessonContentQuery,
  useGetLessonQuery,
} from "src/redux/services/student/lesson-student";
import { useCompleteLessonMutation } from "src/redux/services/student/progress-student";
import { CodePanelChat } from "@sections/chat";

const Tour = dynamic(
  async () =>
    await import(
      "@sections/code-panel/code-panel-tour/CodePanelTour"
    ),
  {
    ssr: false,
  }
);

export default function CodePanelSettingPage(): React.ReactElement {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up(1000));
  const router = useRouter();
  const { user } = useAuthContext();
  const handle = useFullScreenHandle();
  const { enqueueSnackbar } = useSnackbar();
  const [confetti, setConfetti] = useState(false);
  const [code, onChangeCode] = useState<string>("");
  const [language, onChangeLanguage] = useState<SupportedLang>("html");

  // ONLY LOGINED USER CAN USE
  useOnlineConnection(user?.id);
  useRealTimeConnection(user?.id, code);

  const [, setGlobalCodePanel] = useAtom(globalCodePanelAtom);

  const [completeLesson] = useCompleteLessonMutation();

  const { data: lesson } = useGetLessonQuery({
    id: router.query.lesson_id as string,
  });

  const { data: courseContent } = useGetChallangesQuery(
    { id: router.query.id as string },
    { skip: !router.query.id }
  );

  const { data, isLoading, isFetching } = useGetLessonContentQuery(
    { id: router.query.lesson_id as string },
    { skip: !router.query.lesson_id }
  );

  const onSubmitChalange = async (lessonContentId: string): Promise<void> => {
    try {
      await completeLesson({
        id: router.query.id as string,
        module_id: router.query.unit_id as string,
        lesson_content_id: lessonContentId,
      }).unwrap();
    } catch (e: any) {
      enqueueSnackbar("something went wrong", { variant: "error" });
    }
  };

  const onSubmitLesson = async (): Promise<void> => {
    setConfetti(true);
    try {
      enqueueSnackbar("lesson successfuly complete");
      if (!courseContent) return;
      const nextLessonInfo = getNextLessonId(
        courseContent.units,
        router.query.lesson_id as string,
        router.query.unit_id as string
      );
      if (nextLessonInfo) {
        router
          .push(
            `/${PATH_PAGE.codePanel.workSpace(router.query.id as string)}/${
              nextLessonInfo.path
            }`
          )
          .then(() => {
            setGlobalCodePanel((prev) => ({
              ...prev,
              slideIndex: 0,
              lessonId: nextLessonInfo.lessonId,
            }));
          });
      } else {
        enqueueSnackbar("course successfuly complete");
      }
    } catch (e: any) {
      enqueueSnackbar("something went wrong", { variant: "error" });
    }
  };

  useEffect(() => {
    setGlobalCodePanel((prev) => ({
      ...prev,
      isFullScreenView: handle.active,
      unitId: router.query.unit_id as string,
    }));
  }, [handle.active]);
  useEffect(() => {
    setGlobalCodePanel((prev) => ({
      ...prev,
      fullScreenOpen: handle.enter,
      fullScreenClose: handle.exit,
    }));
  }, []);

  if (isLoading || !data) return <SkeletonCodePanel />;
  if (!isLoading && _.isEmpty(data) && data !== undefined) {
    return <EmptyContent title="Course doesn`t exist" />;
  }

  return (
    <Box>
      <Head>
        <title> CodePanel: CodeTribe </title>
      </Head>
      <FullScreen handle={handle}>
        <Tour />
        <CodePanelContext.Provider
          value={{
            onSubmitChalange,
            onSubmitLesson,
            isFetching,
            lesson,
            data,
            user,
            code,
            onChangeCode,
            language,
            onChangeLanguage,
          }}
        >
          <Box
            bgcolor="white"
            sx={{ position: "relative", overflow: "hidden" }}
          >
            <TopPanel chatComponent={<CodePanelChat />} />
            <WorkSpace />
            <BottomBar />
          </Box>
          {!isDesktop ? <ChatPopup chatComponent={<CodePanelChat />} /> : null}
        </CodePanelContext.Provider>
      </FullScreen>
      <Confetti
        numberOfPieces={confetti ? 500 : 0}
        recycle={false}
        gravity={0.25}
        onConfettiComplete={(confetti) => {
          setConfetti(false);
          confetti?.reset();
        }}
      />
    </Box>
  );
}
