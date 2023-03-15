import { Box } from "@mui/material";
import { Remirror, useRemirror } from "@remirror/react";

interface Props {
  content: string;
}

export default function LessonContentMultimedia({
  content,
}: Props): React.ReactElement {
  const { manager } = useRemirror({
    content,
    stringHandler: "html",
  });

  return (
    <Box>
      <Remirror
        manager={manager}
        editable={false}
        initialContent={content}
      ></Remirror>
    </Box>
  );
}
