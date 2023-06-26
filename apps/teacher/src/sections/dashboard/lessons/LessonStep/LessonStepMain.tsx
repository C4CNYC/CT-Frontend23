import { ResizerUi } from "@ct-nx/components";
import { Box, Dialog } from "@mui/material";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { lessonViewAtom } from "./lesson-atoms/lesson-view-atom";
import LessonTopBar from "./lesson-top-bar/LessonTopBar";
import StepContentEditor from "./LessonStepContent/StepContentEditor";
import LessonStepList from "./LessonStepList";
import { NoSelectedStep } from "./NoSelectedStep";

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
      <FullScreen handle={handle}>
        <Dialog
          open={Boolean(lessonId)}
          onClose={() => {}}
          PaperProps={{ sx: { height: "100vh" } }}
          fullScreen
        >
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
        </Dialog>
      </FullScreen>
    </>
  );
}
