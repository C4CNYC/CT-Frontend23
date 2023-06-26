import { MyEditor, ResizerUi } from "@ct-nx/components";
import { useAtom } from "jotai";
import { useState } from "react";
import { lessonViewAtom } from "../lesson-atoms/lesson-view-atom";

interface Props {
  content: string;
  onSubmit: (value: string) => void;
}

export default function StepMultimedia({
  onSubmit,
  content,
}: Props): React.ReactElement {
  const [value, setValue] = useState<string>("");
  const [{ isAllColumnsVisible }] = useAtom(lessonViewAtom);

  return (
    <ResizerUi
      split="vertical"
      maxSize={-100}
      primary="second"
      defaultSize={isAllColumnsVisible ? 500 : "100%"}
      allowResize={isAllColumnsVisible}
    >
      <MyEditor
        onSubmit={() => {
          onSubmit(JSON.stringify(value));
        }}
        multimediaValue={content}
        setMultimediaValue={setValue}
      />
      {isAllColumnsVisible && (
        <MyEditor editable={false} multimediaValue={value} />
      )}
    </ResizerUi>
  );
}
