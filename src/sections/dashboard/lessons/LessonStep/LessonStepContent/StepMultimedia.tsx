import { useState } from "react";

import { useAtom } from "jotai";

import { Box } from "@mui/material";

import { MyEditor, ResizerUi } from "@components";

import { multimediaLockedAtom } from "./lesson-multimedia-atom";

interface Props {
  content: string;
  onSubmit: (value: string) => void;
}

export default function StepMultimedia({
  onSubmit,
  content,
}: Props): React.ReactElement {
  const [value, setValue] = useState<string>("");
  const [locked] = useAtom(multimediaLockedAtom);
  return (
    <>
      <ResizerUi split="vertical" primary="first" defaultSize={800}>
        <MyEditor
          onSubmit={() => {
            onSubmit(JSON.stringify(value));
          }}
          multimediaValue={content}
          setMultimediaValue={setValue}
        />
        <Box
          sx={{
            visibility: !locked ? "hidden" : "initial",
          }}
        >
          <MyEditor editable={false} multimediaValue={value} />
        </Box>
      </ResizerUi>
    </>
  );
}
