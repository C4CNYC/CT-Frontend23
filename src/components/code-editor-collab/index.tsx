import { type FC, memo } from "react";

import CodeMirror from '@uiw/react-codemirror';

import LoadingCodeEditor from "./components/loading-code-editor"

import {
	type UseCodeEditorCollabProps,
	useCodeEditorCollab,
	EditorMode
} from "./hook";
import { useStyles } from "./styles";
import { useFileManager } from "./hook/useFileManager";
import FileModal from "./components/file-modal";
import FileSwitcher from "./components/file-switcher";

interface CodeEditorCollabProps extends Omit<UseCodeEditorCollabProps, 'activeFile' | 'onDeleteFile' | 'setActiveFile'> {
	className?: string
	isReadOnly?: boolean
	withFileManager?: boolean
}

const CodeEditorCollab: FC<CodeEditorCollabProps> = ({
	className,
	isReadOnly = false,
	mode,
	withFileManager = true,
	...otherProps
}) => {
	const styles = useStyles();
	const {
		activeFile,
		setActiveFile,
		isFileFormOpen,
		isOpen,
		setIsOpen,
		fileList,
		setIsFileFormOpen,
		onAddFile,
		addedFileList,
		onDeleteFile: _onDeleteFile
	} = useFileManager();

	const {
		editorRef,
		isLoading,
		extensions,
		doc,
		key,
		onDeleteFile,
		onChangeActiveFile
	} = useCodeEditorCollab({
		...otherProps,
		activeFile,
		onDeleteFile: _onDeleteFile,
		setActiveFile,
		mode
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
						activeFile={activeFile}
						setActiveFile={onChangeActiveFile}
						setIsOpen={setIsOpen}
						fileList={fileList}
						setIsFileFormOpen={setIsFileFormOpen}
						onAddFile={onAddFile}
						onDeleteFile={onDeleteFile}
					/>

					<FileSwitcher
						activeFile={activeFile}
						onChange={onChangeActiveFile}
						fileList={addedFileList}
					/>
				</>
			}

			{isLoading && <LoadingCodeEditor />}

			<CodeMirror
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
