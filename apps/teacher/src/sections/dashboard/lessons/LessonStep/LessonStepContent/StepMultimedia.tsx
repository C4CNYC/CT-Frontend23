import { MyEditor } from "@ct-nx/components";
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
    <MyEditor
      onSubmit={() => {
        onSubmit(JSON.stringify(value));
      }}
      multimediaValue={content}
      setMultimediaValue={setValue}
    />
  );
}
