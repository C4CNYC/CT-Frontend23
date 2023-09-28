import dynamic from "next/dynamic";
import Head from "next/head";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import {useCallback, useEffect, useState} from "react";

import { useAtom } from "jotai";
import { useSnackbar } from "notistack";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { useOnlineConnection, useRealTimeConnection } from "@hooks";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import { CodePanelChat } from "@sections/chat";
import { globalCodePanelAtom } from "@sections/code-panel/atoms/global-code-panel.atom";
import { CodePanelContext } from "@sections/code-panel/context/CodePanel.context";
import { isValidLastVisitedData } from "@sections/code-panel/helpers";
import SkeletonCodePanel, {
  CPTopBarSkeleton,
} from "@sections/code-panel/skeleton";
import { getNextLessonId } from "@sections/code-panel/utils/navigation";
import WorkSpace, { SupportedLang } from "@sections/code-panel/work-space";
import { useAuthContext } from "src/auth/useAuthContext";
import { useGetChallangesQuery } from "src/redux/services/manager/challenges-student";
import {
  useGetLessonContentStudentQuery,
  useGetLessonStudentQuery,
  useUpdateStudentLastVisitedDataMutation,
} from "src/redux/services/manager/lesson-student";
import { useCompleteLessonMutation } from "src/redux/services/manager/progress-student";

import { LastVisitedState } from "../../../redux/interfaces/content.interface";

const Tour = dynamic(
  async () =>
    await import("@sections/code-panel/code-panel-tour/CodePanelTour"),
  {
    ssr: false,
  }
);
const TopPanel = dynamic(
  async () => await import("@sections/code-panel/top-bar"),
  { loading: () => <CPTopBarSkeleton /> }
);
const Confetti = dynamic(async () => await import("react-confetti"));
const ChatPopup = dynamic(
  async () =>
    await import("@sections/code-panel/top-bar/nav-bar/options/ChatPopUp")
);
const BottomBar = dynamic(
  async () => await import("@sections/code-panel/bottom-bar")
);
export default function Index(): React.ReactElement | null {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up(1000));
  const { enqueueSnackbar } = useSnackbar();
  const handle = useFullScreenHandle();
  const { push, query, replace } = useRouter();
  const { user } = useAuthContext();
  const searchParams = useSearchParams();

  const [confetti, setConfetti] = useState(false);
  const [code, setCode] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return window.localStorage.getItem(`code-${query.id}`) ?? "";
    }
    return "";
  });
  const [language, onChangeLanguage] = useState<SupportedLang>("html");
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  const [lastVisitedData, setLastVisitedData] = useState<LastVisitedState>({
    unitId: null,
    lessonId: null,
  });
  const unitId = searchParams.get("unitId");
  const lessonId = searchParams.get("lessonId");

  const onChangeCode = useCallback((code: string) => {
    setCode(code);
    window.localStorage.setItem(`code-${query.id}`, code);
  }, []);

  const [{ unitId: atomUnitId, lessonId: atomLessonId }, setGlobalCodePanel] =
    useAtom(globalCodePanelAtom);
  // ONLY LOGINED USER CAN USE
  useOnlineConnection(user?.id);
  useRealTimeConnection(user?.id);

  const [completeLesson] = useCompleteLessonMutation();
  const [updateLastVisitedDataTrigger] =
    useUpdateStudentLastVisitedDataMutation();

  const { data, isLoading, isFetching } = useGetLessonContentStudentQuery(
    { id: query.lessonId as string },
    { skip: !query.lessonId }
  );
  const { data: courseContent, isLoading: isLoadingCourseContent } =
    useGetChallangesQuery({ id: query.id as string }, { skip: !query.id });

  const { data: lesson, isLoading: isLoadingLesson } = useGetLessonStudentQuery(
    {
      id: query.lessonId as string,
    },
    { skip: !query.lessonId }
  );

  const onOpenLesson = (lessonId: string, unitId: string): void => {
    setGlobalCodePanel((prev) => ({
      ...prev,
      courseId: query.id as string,
      unitId,
      lessonId,
    }));
    replace(
      `${STUDENT_PATH_DASHBOARD.codePanel.workSpace(
        courseContent?.id as string
      )}?${new URLSearchParams({ unitId })}&${new URLSearchParams({
        lessonId,
      })}`,
      undefined,
      { shallow: true }
    );
  };

  const updateLastVisitedData = async () => {
    if (isValidLastVisitedData(lastVisitedData)) {
      await updateLastVisitedDataTrigger(lastVisitedData).unwrap();
    }
  };

  useEffect(() => {
    if (!courseContent) return;
    if (!atomLessonId && !atomUnitId) {
      if (!courseContent.units[0].lessons[0].id || !courseContent.units[0].id) {
        push(STUDENT_PATH_DASHBOARD.page404);
      }
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
          `${STUDENT_PATH_DASHBOARD.codePanel.workSpace(
            courseContent?.id
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
    if (!query.id) {
      push(STUDENT_PATH_DASHBOARD.page404);
    }
    setGlobalCodePanel((prev) => ({
      ...prev,
      fullScreenOpen: handle.enter,
      fullScreenClose: handle.exit,
    }));
  }, []);

  useEffect(() => {
    if (!isLoading && !isLoadingCourseContent && !isLoadingLesson) {
      setIsLoadingComplete(true);
    }
  }, [isLoading, isLoadingCourseContent, isLoadingLesson]);

  useEffect(() => {
    setLastVisitedData({
      unitId,
      lessonId,
    });
  }, [unitId, lessonId]);

  useEffect(() => {
    return () => {
      updateLastVisitedData();
    };
  }, [lastVisitedData]);

  if (!isLoadingComplete) {
    return <SkeletonCodePanel />;
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
            data: data ?? [],
            user: user?.student_profile,
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
