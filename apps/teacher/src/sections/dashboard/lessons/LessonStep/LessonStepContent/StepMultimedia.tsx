import { ResizerUi, MyEditor } from "@ct-nx/components";
import { useState } from "react";

interface Props {
  content: string;
  onSubmit: (value: string) => void;
}

export default function StepMultimedia({
  onSubmit,
  content,
}: Props): React.ReactElement {
  const [value, setValue] = useState<string>("");

  return (
    <ResizerUi
      split="vertical"
      maxSize={-100}
      primary="second"
      defaultSize={500}
    >
      <MyEditor
        onSubmit={() => {
          onSubmit(JSON.stringify(value));
        }}
        multimediaValue={content}
        setMultimediaValue={setValue}
      />
      <MyEditor editable={false} multimediaValue={value} />
    </ResizerUi>
  );
}
