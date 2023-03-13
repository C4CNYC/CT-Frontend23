import MyEditor from "@components/editor/MyEditor";
import { Box } from "@mui/material";

type Props = {
  multimediaValue: string;
  setMultimediaValue: Function;
};

export default function StepMultimedia({
  multimediaValue,
  setMultimediaValue,
}: Props): React.ReactElement {
  return (
    <Box sx={{ height: "calc(100vh - 48px)" }}>
      <MyEditor
        multimediaValue={multimediaValue}
        setMultimediaValue={setMultimediaValue}
        lessonId="sdf"
      />
    </Box>
  );
}
