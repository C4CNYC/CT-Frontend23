import { ResizerUi } from "@components/resizer/Resizer";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Dialog, DialogContent, IconButton } from "@mui/material";
import { useRouter } from "next/router";
import StepContentEditor from "./LessonStepContent/StepContentEditor";
import LessonStepList from "./LessonStepList";
import { NoSelectedStep } from "./NoSelectedStep";

export default function LessonStepMain(): React.ReactElement {
  const router = useRouter();
  const { stepId, lessonId } = router.query;
  const onClose = (): void => {
    router.push(router.pathname, undefined, { shallow: true });
  };

  return (
    <>
      <Dialog open={Boolean(lessonId)} onClose={onClose} fullScreen>
        <DialogContent>
          <IconButton
            edge="start"
            size="small"
            color="inherit"
            onClick={onClose}
            aria-label="close"
            sx={{
              position: "absolute",
              zIndex: "10000",
              mt: "2px",
              mr: 1,
              right: 0,
              top: 0,
              width: "40px",
              height: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CloseIcon />
          </IconButton>
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
        </DialogContent>
      </Dialog>
    </>
  );
}
