import { useState } from "react";

import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import CodeMirror from "@uiw/react-codemirror";
import { useAtom } from "jotai";
import { dracula } from "thememirror";

import { Box } from "@mui/system";

import { ResizerUi, SaveButton } from "@components";
import { useDebounceCallback } from "@hooks";
import { IIntegration } from "src/redux/services/interfaces/integration.interface";

import { lessonViewAtom } from "../lesson-atoms/lesson-view-atom";

interface Props {
  content: string;
  integrations: IIntegration[];
  onSubmit: (value: string) => void;
}

export default function StepCode({
  content,
  integrations,
  onSubmit,
}: Props): React.ReactElement {
  const [value, setValue] = useState<string>("");
  const [staticValue, setStaticValue] = useState<string>("");
  const handleDebouncedCallback = useDebounceCallback(1500);
  const [{ isAllColumnsVisible }] = useAtom(lessonViewAtom);

  handleDebouncedCallback(() => {
    setStaticValue(value);
  });

  const pageSkeleton = (userContent: string): string | undefined => {
    if (integrations) {
      return `<head>${integrations.reduce(
        (ac, cur) => ac + cur.head,
        ""
      )}</head><main>${userContent}${integrations.reduce((ac, cur) => {
        return ac + cur.scripts;
      }, "")}</main>`;
    }
  };

  useState(() => {
    if (content) setValue(JSON.parse(content).content);
  });
  return (
    <ResizerUi
      split="vertical"
      defaultSize={isAllColumnsVisible ? "70%" : "100%"}
      allowResize={false}
    >
      <Box position="relative">
        <CodeMirror
          value={value}
          theme={dracula}
          height="calc(100vh - 96px)"
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
      {isAllColumnsVisible && (
        <Box
          sx={{
            height: "calc(100vh - 96px)",
          }}
        >
          <iframe
            style={{
              border: 0,
              width: "100%",
              height: "100%",
            }}
            src={
              "data:text/html," +
              encodeURIComponent(pageSkeleton(staticValue) as string)
            }
          />
        </Box>
      )}
    </ResizerUi>
  );
}
