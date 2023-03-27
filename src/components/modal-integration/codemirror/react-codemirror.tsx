import { javascript } from "@codemirror/lang-javascript";
import CodeMirror from "@uiw/react-codemirror";
import React from "react";

interface Prop {
  value: string;
}

function ReactCodeMirror({ value }: Prop) {
  const onChange = React.useCallback((value: any, viewUpdate: any) => {
    console.log("value:", value);
  }, []);
  return (
    <CodeMirror
      value={value}
      height="180px"
      extensions={[javascript({ jsx: true })]}
      onChange={onChange}
    />
  );
}
export default ReactCodeMirror;
