import React from "react";

import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import CodeMirror from "@uiw/react-codemirror";

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
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      extensions={[loadLanguage("html")]}
      onChange={(value) => {
        setCode(value);
      }}
    />
  );
}
