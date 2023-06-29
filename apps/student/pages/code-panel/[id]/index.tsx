import { EmptyContent, LoadingScreen } from "@ct-nx/components";
import { useOnlineConnection } from "@ct-nx/hooks";
import { useRealTimeConnection } from "@hooks/useRealTimeConnection";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { PATH_PAGE } from "@routes/paths";
import { CodePanelChat } from "@sections/chat";
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

const Tour = dynamic(
  async () =>
    await import("@sections/code-panel/code-panel-tour/CodePanelTour"),
  {
    ssr: false,
  }
);

export default function Index(): React.ReactElement | null {
  const { push, query } = useRouter();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up(1000));
  const { user } = useAuthContext();
  const handle = useFullScreenHandle();
  const { enqueueSnackbar } = useSnackbar();
  const [confetti, setConfetti] = useState(false);
  const [code, onChangeCode] = useState<string>("");
  const [language, onChangeLanguage] = useState<SupportedLang>("html");
  // ONLY LOGINED USER CAN USE
  useOnlineConnection(user?.id);
  useRealTimeConnection(user?.id, code);

  const [
    { courseId: atomCourseId, unitId: atomUnitId, lessonId: atomLessonId },
    setGlobalCodePanel,
  ] = useAtom(globalCodePanelAtom);

  const [completeLesson] = useCompleteLessonMutation();

  const { data: courseContent, isLoading: isLoadingCourseContent } =
    useGetChallangesQuery({ id: query.id as string }, { skip: !query.id });

  const { data, isLoading, isFetching } = useGetLessonContentQuery(
    { id: query.lessonId as string },
    { skip: !query.lessonId }
  );
  const { data: lesson, isLoading: isLoadingLesson } = useGetLessonQuery(
    {
      id: query.lessonId as string,
    },
    { skip: !query.lessonId }
  );

  const onOpenLesson = (lessonId: string, unitId: string): void => {
    setGlobalCodePanel((prev) => ({
      ...prev,
      courseId: query.id as string,
      unitId: unitId,
      lessonId: lessonId,
    }));
    push(
      `${PATH_PAGE.codePanel.workSpace(
        courseContent?.id as string
      )}?${new URLSearchParams({ unitId })}&${new URLSearchParams({
        lessonId,
      })}`,
      undefined,
      { shallow: true }
    );
  };

  useEffect(() => {
    if (!courseContent) return;
    if (!atomLessonId && !atomUnitId) {
      onOpenLesson(
        courseContent.units[0].lessons[0].id,
        courseContent.units[0].id
      );
    } else {
      onOpenLesson(atomLessonId, atomUnitId);
    }
  }, [courseContent]);

  const onSubmitChalange = async (lessonContentId: string): Promise<void> => {
    try {
      await completeLesson({
        id: query.id as string,
        module_id: query.unit_id as string,
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
        query.lessonId as string,
        query.unitId as string
      );
      if (nextLessonInfo) {
        const pathStr = nextLessonInfo.path.split("/");
        push(
          `${PATH_PAGE.codePanel.workSpace(
            courseContent?.id as string
          )}?${new URLSearchParams({
            unitId: pathStr[0],
          })}&${new URLSearchParams({
            lessonId: pathStr[1],
          })}`,
          undefined,
          { shallow: true }
        ).then(() => {
          setGlobalCodePanel((prev) => ({
            ...prev,
            slideIndex: 0,
            unitId: pathStr[0],
            lessonId: pathStr[1],
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
    }));
  }, [handle.active]);
  useEffect(() => {
    setGlobalCodePanel((prev) => ({
      ...prev,
      fullScreenOpen: handle.enter,
      fullScreenClose: handle.exit,
    }));
  }, []);

  if (
    !data ||
    !lesson ||
    !courseContent ||
    isLoading ||
    isLoadingCourseContent ||
    isLoadingLesson
  ) {
    return <SkeletonCodePanel />;
  }
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
