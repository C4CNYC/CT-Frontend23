import { type FC } from "react";

import ReactCodeMirror from "@uiw/react-codemirror";

interface CodeEditorPureProps {
  className: string
  value?: string
  onChange?: (value: string) => void
}

const CodeEditorPure: FC<CodeEditorPureProps> = ({
  value,
  className,
  onChange
}) => {
  return (
    <div className="code-editor-wrapper">
      <ReactCodeMirror
				className={`flex-1 overflow-scroll text-left ${className}`}
				height="100%"
				basicSetup={false}
				theme="dark"
				value={value}
        onChange={onChange}
			/>
    </div>
  )
}

export default CodeEditorPure;
