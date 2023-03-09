import MyEditor from "@components/editor/MyEditor";
import { Box } from "@mui/material";

export default function StepMultimedia(): React.ReactElement {
  return (
    <Box sx={{ height: "calc(100vh - 48px)" }}>
      <MyEditor lessonId="sdf" />
    </Box>
  );
}
