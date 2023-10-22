import { type FC, memo } from "react";

import CodeMirror from '@uiw/react-codemirror';

import LoadingCodeEditor from "./LoadingCodeEditor"

import {
	type UseCodeEditorCollabProps,
	useCodeEditorCollab
} from "./hook";

interface CodeEditorCollabProps extends UseCodeEditorCollabProps {
	className?: string
	isReadOnly?: boolean
}

const CodeEditorCollab: FC<CodeEditorCollabProps> = ({
	className,
	isReadOnly = false,
	...otherProps
}) => {
	const {
		onCreateEditor,
		editorRef,
		extensions,
		isLoading,
	} = useCodeEditorCollab(otherProps);

	return (
		<div className="code-editor-wrapper" ref={editorRef}>
			{isLoading && <LoadingCodeEditor />}

			<CodeMirror
				onCreateEditor={onCreateEditor}
				className={`flex-1 overflow-scroll text-left ${className}`}
				height="100%"
				basicSetup={false}
				theme="dark"
				extensions={extensions}
				readOnly={isReadOnly}
			/>
		</div>
	)
}

export default memo(CodeEditorCollab);
