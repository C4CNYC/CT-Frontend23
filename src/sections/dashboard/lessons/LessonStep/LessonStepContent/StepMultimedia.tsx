import { useContext, useState } from "react";

import { Box } from "@mui/material";

import { MyEditor, ResizerUi } from "@components";

import { LessonContentContext } from "./LessonContent.context";

interface Props {
  content: string;
  onSubmit: (value: string) => void;
}

export default function StepMultimedia({
  onSubmit,
  content,
}: Props): React.ReactElement {
  const { locked } = useContext(LessonContentContext);
  const [value, setValue] = useState<string>("");

  return (
    <ResizerUi split="vertical" primary="first" defaultSize={800}>
      <MyEditor
        onSubmit={() => {
          onSubmit(JSON.stringify(value));
        }}
        multimediaValue={content}
        setMultimediaValue={setValue}
        editable={!locked}
        locked={locked}
      />
      <Box>
        <MyEditor editable={false} multimediaValue={value} />
      </Box>
    </ResizerUi>
  );
}
