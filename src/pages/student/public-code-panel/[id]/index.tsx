import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { useAtom } from "jotai";
import _ from "lodash";
import { useSnackbar } from "notistack";
import Confetti from "react-confetti";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

import { Box } from "@mui/material";

import { EmptyContent } from "@components";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import { CodePanelChat } from "@sections/chat";
import SkeletonCodePanel from "@sections/code-editor-panel/skeleton";
import { getNextLessonId } from "@sections/code-editor-panel/utils/navigation";
import { globalCodePanelAtom } from "@sections/code-panel/atoms/global-code-panel.atom";
import BottomBar from "@sections/code-panel/bottom-bar";
import { CodePanelContext } from "@sections/code-panel/context/CodePanel.context";
import TopPanel from "@sections/code-panel/top-bar";
import WorkSpace, { SupportedLang } from "@sections/code-panel/work-space";
import GuestGuard from "src/auth/GuestGuard";
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

export default function Index(): React.ReactElement {
  const { query, push } = useRouter();
  const publicPage = true;
  const user = null;
  const handle = useFullScreenHandle();
  const { enqueueSnackbar } = useSnackbar();
  const [confetti, setConfetti] = useState(false);
  const [, setGlobalCodePanel] = useAtom(globalCodePanelAtom);
  const [code, onChangeCode] = useState<string>("");
  const [language, onChangeLanguage] = useState<SupportedLang>("html");

  const { data: courseContent, isLoading: isLoadingCourseContent } =
    useGetPublicCourseContentQuery(
      { id: query.id as string },
      { skip: !query.id }
    );

  const { data, isLoading } = useGetPublicLessonContentQuery({
    id: query.id as string,
    lesson_id: query.lessonId as string,
  });

  const { data: lesson } = useGetPublicLessonQuery({
    id: query.id as string,
    lesson_id: query.lessonId as string,
  });

  const onOpenLesson = (lessonId: string, unitId: string): void => {
    push(
      `${STUDENT_PATH_DASHBOARD.publicCodePanel.workSpace(query?.id as string, {
        unitId,
        lessonId,
      })}`,
      undefined,
      { shallow: true }
    );
  };

  const onSubmitChalange = async (): Promise<void> => {
    enqueueSnackbar("Chalange successfuly complete");
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
            courseContent?.id,
            { unitId: pathStr[0], lessonId: pathStr[1] }
          )}`,
          undefined,
          { shallow: true }
        ).then(() => {
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
    if (!courseContent) return;
    onOpenLesson(
      courseContent.units[0].lessons[0].id,
      courseContent.units[0].id
    );
  }, [courseContent]);

  useEffect(() => {
    setGlobalCodePanel((prev) => ({
      ...prev,
      isFullScreenView: handle.active,
    }));
  }, [handle.active]);

  if (isLoading || isLoadingCourseContent || !data || !courseContent) {
    return <SkeletonCodePanel />;
  }
  if (!isLoading && _.isEmpty(data)) {
    return <EmptyContent title="Course doesn`t exist" />;
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
              lesson,
              data,
              user,
              publicPage,
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
