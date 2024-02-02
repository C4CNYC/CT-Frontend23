import { useRouter } from "next/router";
import { useEffect } from "react";

import { useAtom } from "jotai";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

import { Box, Dialog } from "@mui/material";

import { ResizerUi } from "@components";
import { NoSelectedStep } from "@sections/dashboard/lessons/LessonStep/NoSelectedStep";
import LessonTopBar from "@sections/dashboard/lessons/LessonStep/lesson-top-bar/LessonTopBar";

import LessonDetails from "./LessonDetails";
import ModuleLessonList from "./ModuleLessonList";

// import StepContentEditor from "./LessonStepContent/StepContentEditor";
// import LessonStepList from "./LessonStepList";
// import { NoSelectedStep } from "./NoSelectedStep";
// import LessonTopBar from "./lesson-top-bar/LessonTopBar";

export default function ModuleOrganizing(): React.ReactElement {
  const router = useRouter();
  const { lessonId, moduleId } = router.query;
  //   const [, setLessonView] = useAtom(lessonViewAtom);
  const handle = useFullScreenHandle();

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
        open={Boolean(moduleId)}
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
              <ModuleLessonList moduleId={moduleId as string} />
              {moduleId ? <LessonDetails /> : <NoSelectedStep />}
            </ResizerUi>
          </Box>
        </FullScreen>
      </Dialog>
    </>
  );
}
