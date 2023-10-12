import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { useAtom } from "jotai";
import { useSnackbar } from "notistack";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

import { Box } from "@mui/material";

import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import { globalCodePanelAtom } from "@sections/code-panel/atoms/global-code-panel.atom";
import { CodePanelContext } from "@sections/code-panel/context/CodePanel.context";
import SkeletonCodePanel, {
  CPTopBarSkeleton,
} from "@sections/code-panel/skeleton";
import { getNextLessonId } from "@sections/code-panel/utils/navigation";
import WorkSpace, { SupportedLang } from "@sections/code-panel/work-space";
import GuestGuard from "src/auth/GuestGuard";
import { useCompleteLessonMutation } from "src/redux/services/manager/progress-student";
import {
  useGetPublicCourseContentQuery,
  useGetPublicLessonContentQuery,
  useGetPublicLessonQuery,
} from "src/redux/services/public-student";

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
const BottomBar = dynamic(
  async () => await import("@sections/code-panel/bottom-bar")
);
export default function Index(): React.ReactElement | null {
  const { enqueueSnackbar } = useSnackbar();
  const handle = useFullScreenHandle();
  const { push, query, replace } = useRouter();
  const [confetti, setConfetti] = useState(false);
  const [code, setCode] = useState("");
  const [language, onChangeLanguage] = useState<SupportedLang>("html");
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  const [{ unitId: atomUnitId, lessonId: atomLessonId }, setGlobalCodePanel] =
    useAtom(globalCodePanelAtom);

  const [completeLesson] = useCompleteLessonMutation();

  const { data: courseContent, isLoading: isLoadingCourseContent } =
    useGetPublicCourseContentQuery(
      { id: query.id as string },
      { skip: !query.id }
    );

  const { data, isLoading, isFetching } = useGetPublicLessonContentQuery(
    {
      id: query.id as string,
      lesson_id: query.lessonId as string,
    },
    { skip: !query.lessonId || !query.id }
  );

  const { data: lesson, isLoading: isLoadingLesson } = useGetPublicLessonQuery(
    {
      id: query.id as string,
      lesson_id: query.lessonId as string,
    },
    { skip: !query.lessonId || !query.id }
  );

  const onOpenLesson = (lessonId: string, unitId: string): void => {
    setGlobalCodePanel((prev) => ({
      ...prev,
      courseId: query.id as string,
      unitId,
      lessonId,
    }));
    replace(
      `${STUDENT_PATH_DASHBOARD.publicCodePanel.workSpace(
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
      if (!courseContent.units[0].lessons[0].id || !courseContent.units[0].id) {
        console.log("work");
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
          `${STUDENT_PATH_DASHBOARD.publicCodePanel.workSpace(
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

  if (!isLoadingComplete) {
    return <SkeletonCodePanel />;
  }

  return (
    <GuestGuard>
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
              user: null,
              code,
              onChangeCode: setCode,
              language,
              onChangeLanguage,
              publicPage: true,
            }}
          >
            <Box
              bgcolor="white"
              sx={{ position: "relative", overflow: "hidden" }}
            >
              <TopPanel chatComponent={null} />
              <WorkSpace />
              <BottomBar />
            </Box>
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
    </GuestGuard>
  );
}
