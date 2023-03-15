import { Box, height } from "@mui/system";

interface Props {
  content: string;
}

export default function LessonContentBrowser({
  content = "",
}: Props): React.ReactElement {
  return (
    <Box position="absolute" top="0" left={0} right={0} height="100%">
      <iframe
        style={{
          border: 0,
          width: "100%",
          height: "100%",
        }}
        src={"data:text/html," + encodeURIComponent(content)}
      />
    </Box>
  );
}
