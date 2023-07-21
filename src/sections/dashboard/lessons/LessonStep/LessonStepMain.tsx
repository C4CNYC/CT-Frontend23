import { useRouter } from "next/router";
import { useEffect } from "react";

import { useAtom } from "jotai";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

import { Box, Dialog } from "@mui/material";

import { ResizerUi } from "@components";

import StepContentEditor from "./LessonStepContent/StepContentEditor";
import LessonStepList from "./LessonStepList";
import { NoSelectedStep } from "./NoSelectedStep";
import { lessonViewAtom } from "./lesson-atoms/lesson-view-atom";
import LessonTopBar from "./lesson-top-bar/LessonTopBar";

export default function LessonStepMain(): React.ReactElement {
  const router = useRouter();
  const { stepId, lessonId } = router.query;
  const [, setLessonView] = useAtom(lessonViewAtom);
  const handle = useFullScreenHandle();

  useEffect(() => {
    setLessonView((prev) => ({
      ...prev,
      isFullScreenView: handle.active,
      unitId: router.query.unit_id as string,
    }));
  }, [handle.active]);
  useEffect(() => {
    setLessonView((prev) => ({
      ...prev,
      fullScreenOpen: handle.enter,
      fullScreenClose: handle.exit,
    }));
  }, []);
  return (
    <>
      <style>
        {`
        .fullscreen-enabled {
          background: #fff;
        }
      `}
      </style>
      <Dialog
        open={Boolean(lessonId)}
        onClose={() => {}}
        PaperProps={{ sx: { height: "100vh" } }}
        fullScreen
      >
        <FullScreen handle={handle}>
          <LessonTopBar />

          <Box>
            <ResizerUi
              split="vertical"
              minSize={300}
              maxSize={750}
              defaultSize={"400px"}
            >
              <LessonStepList lessonId={lessonId as string} />
              {stepId ? <StepContentEditor /> : <NoSelectedStep />}
            </ResizerUi>
          </Box>
        </FullScreen>
      </Dialog>
    </>
  );
}
