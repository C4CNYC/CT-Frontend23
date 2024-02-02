import React from "react";

// import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html"

interface Props {
  code: string;
  setCode: (value: string) => void;
}

export default function GalleryCodeTab({
  code,
  setCode,
}: Props): React.ReactElement {
  return (
    <CodeMirror
      value={code}
      style={{ height: "100%" }}
      height="100%"
      // extensions={[loadLanguage("html")]}
      extensions={[html()]}
      onChange={(value) => {
        setCode(value);
      }}
    />
  );
}
