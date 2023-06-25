import { EmptyContent } from "@ct-nx/components";
import { Box } from "@mui/material";
import { PATH_PAGE } from "@routes/paths";
import { CodePanelChat } from "@sections/chat";
import { globalCodePanelAtom } from "@sections/code-panel/atoms/global-code-panel.atom";
import BottomBar from "@sections/code-panel/bottom-bar";
import { CodePanelContext } from "@sections/code-panel/context/CodePanel.context";
import SkeletonCodePanel from "@sections/code-panel/skeleton";
import TopPanel from "@sections/code-panel/top-bar";
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
import GuestGuard from "src/auth/GuestGuard";
import {
  useGetPublicCourseContentQuery,
  useGetPublicLessonContentQuery,
  useGetPublicLessonQuery,
} from "src/redux/services/student/public-student";

const Tour = dynamic(
  async () =>
    await import(
      "@sections/code-panel/code-panel-tour/CodePanelTour"
    ),
  {
    ssr: false,
  }
);

export default function CodePanelPublic(): React.ReactElement {
  const publicPage = true;
  const user = null;
  const router = useRouter();
  const handle = useFullScreenHandle();
  const { enqueueSnackbar } = useSnackbar();
  const [confetti, setConfetti] = useState(false);
  const [, setGlobalCodePanel] = useAtom(globalCodePanelAtom);
  const [code, onChangeCode] = useState<string>("");
  const [language, onChangeLanguage] = useState<SupportedLang>("html");

  const { data, isLoading } = useGetPublicLessonContentQuery({
    id: router.query.id as string,
    lesson_id: router.query.lesson_id as string,
  });

  const { data: courseContent } = useGetPublicCourseContentQuery({
    id: router.query.id as string,
  });
  const { data: lesson } = useGetPublicLessonQuery({
    id: router.query.id as string,
    lesson_id: router.query.lesson_id as string,
  });
  const onSubmitChalange = async (lessonContentId: string): Promise<void> => {
    enqueueSnackbar("Chalange successfuly complete");
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
            `/${PATH_PAGE.publicCodePanel.workSpace(
              router.query.id as string
            )}/${nextLessonInfo.path}`
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
    }));
  }, [handle.active]);

  if (isLoading || !data) return <SkeletonCodePanel />;
  if (!isLoading && _.isEmpty(data) && data !== undefined) {
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
