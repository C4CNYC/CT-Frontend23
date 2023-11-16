import { type FC, memo, useRef } from "react";

import CodeMirror from '@uiw/react-codemirror';

import LoadingCodeEditor from "./components/loading-code-editor"

import {
	type UseCodeEditorCollabProps,
	useCodeEditorCollab,
} from "./hook";
import { EditorMode } from "./hook/constants";
import { useStyles } from "./styles";
import { useFileManager } from "./hook/useFileManager";
import FileModal from "./components/file-modal";
import FileSwitcher from "./components/file-switcher";
import { createSocket } from "./hook/utils/socket";

interface CodeEditorCollabProps extends Omit<UseCodeEditorCollabProps,
	'activeFile' |
	'onDeleteFile' |
	'setActiveFile' |
	'onResetFileManager' |
	'socket' |
	'setLocalActiveFile'
	> {
	className?: string
	isReadOnly?: boolean
	withFileManager?: boolean
}

const CodeEditorCollab: FC<CodeEditorCollabProps> = ({
	className,
	isReadOnly = false,
	mode = EditorMode.Owner,
	withFileManager = true,
	roomId,
	...otherProps
}) => {
	const styles = useStyles();
	const socketRef = useRef(createSocket());

	const {
		activeFile,
		isFileFormOpen,
		isOpen,
		setIsOpen,
		fileList,
		setIsFileFormOpen,
		onAddFile,
		addedFileList,
		onDeleteFileWithEvents,
		onChangeFileWithEvents,
		...collabProps
	} = useFileManager({
		socket: socketRef.current,
		roomId,
		mode
	});

	const {
		editorRef,
		isLoading,
		extensions,
		doc,
		key,
		onCreateEditor
	} = useCodeEditorCollab({
		...otherProps,
		...collabProps,
		activeFile,
		mode,
		socket: socketRef.current,
		roomId
	});

	return (
		<div
			className={`${styles.wrapper} code-editor-wrapper`}
			ref={editorRef}
		>
			{withFileManager && 
				<>
					<FileModal
						isOpen={isOpen}
						isFileFormOpen={isFileFormOpen}
						setActiveFile={onChangeFileWithEvents}
						setIsOpen={setIsOpen}
						fileList={fileList}
						setIsFileFormOpen={setIsFileFormOpen}
						onAddFile={onAddFile}
						onDeleteFile={onDeleteFileWithEvents}
						mode={mode}
					/>

					<FileSwitcher
						activeFile={activeFile}
						onChange={onChangeFileWithEvents}
						fileList={addedFileList}
					/>
				</>
			}

			{isLoading && <LoadingCodeEditor />}

			<CodeMirror
				onCreateEditor={onCreateEditor}
				key={key}
				className={`flex-1 overflow-scroll text-left ${className}`}
				height="100%"
				basicSetup={false}
				theme="dark"
				extensions={extensions}
				readOnly={isReadOnly}
				value={doc}
			/>
		</div>
	)
}

export default memo(CodeEditorCollab);
