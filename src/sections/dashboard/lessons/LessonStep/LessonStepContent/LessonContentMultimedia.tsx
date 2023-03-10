import { Box } from "@mui/material";
import { Remirror, useRemirror } from "@remirror/react";

type Props = {
  multimediaValue: string;
};

export default function LessonContentMultimedia({
  multimediaValue,
}: Props): React.ReactElement {
  const { manager, state } = useRemirror({
    content: multimediaValue,
    stringHandler: "html",
  });

  return (
    <Box>
      <Remirror
        manager={manager}
        editable={false}
        initialContent={multimediaValue}
      ></Remirror>
    </Box>
  );
}
