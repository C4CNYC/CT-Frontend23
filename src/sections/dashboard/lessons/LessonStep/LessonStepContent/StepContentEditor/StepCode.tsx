import SaveButton from "@components/editor/SaveButton";
import { ResizerUi } from "@components/resizer/Resizer";
import { Box } from "@mui/system";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import { dracula } from "@uiw/codemirror-theme-dracula";
import CodeMirror from "@uiw/react-codemirror";
import { useState } from "react";
import LessonContentBrowser from "../LessonContentBrowser";

interface Props {
  content: string;
  onSubmit: (value: string) => void;
}

export default function StepCode({
  content,
  onSubmit,
}: Props): React.ReactElement {
  const [value, setValue] = useState<string>();

  useState(() => {
    if (content) setValue(JSON.parse(content).content);
  });
  return (
    <ResizerUi split="vertical" defaultSize={"70%"} allowResize={false}>
      <Box position="relative">
        <CodeMirror
          value={value}
          theme={dracula}
          height="calc(100vh - 48px)"
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          extensions={[loadLanguage("html")]}
          onChange={(value) => {
            setValue(value);
          }}
        />
        <SaveButton
          onClick={() => {
            onSubmit(JSON.stringify({ content: value }));
          }}
          sx={{
            position: "absolute",
            top: 35,
            right: 35,
            color: "#7963d2",
            border: "1px solid rgba(121, 99, 210, 0.5)",
            borderRadius: "4px",
            "&:hover": {
              border: "1px solid rgba(121, 99, 210, 0.5)",
              backgroundColor: " rgba(121, 99, 210, 0.1)",
            },
          }}
        />
      </Box>
      <LessonContentBrowser content={value as string} />
    </ResizerUi>
  );
}
