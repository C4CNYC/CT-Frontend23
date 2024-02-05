import { useRouter } from "next/router";
// import { useEffect } from "react";

import { FullScreen, useFullScreenHandle } from "react-full-screen";

import { Box, Dialog } from "@mui/material";

import LessonDetails from "./LessonDetails";
import ModuleLessonList from "./ModuleLessonList";
import LessonTopBar from "../../lessons/LessonStep/lesson-top-bar/LessonTopBar";
import { ResizerUi } from "@/components";
import { NoSelectedStep } from "../../lessons/LessonStep/NoSelectedStep";


export default function ModuleOrganizing(): React.ReactElement {
  const router = useRouter();
  const { lessonId, moduleId } = router.query;
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
        PaperProps={{ sx: { height: '100vh' } }}
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
