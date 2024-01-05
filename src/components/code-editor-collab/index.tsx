import { type FC, memo } from "react";
import { Socket } from "socket.io-client";
import CodeMirror from "@uiw/react-codemirror";

import LoadingCodeEditor from "./components/loading-code-editor";
import FileModal from "./components/file-modal";
import FileSwitcher from "./components/file-switcher";
import StatusLabel, { RoomStatus } from "./components/status-label";

import { type UseCodeEditorCollabProps, useCodeEditorCollab } from "./hook";
import { EditorMode } from "./hook/constants";
import { useFileManager } from "./hook/file-manager";
import { useStyles } from "./styles";
import { voidFunction } from "@utils";

type ReducedFields = "activeFile" |
  "onDeleteFile" |
  "setActiveFile" |
  "onResetFileManager" |
  "socket" |
  "setLocalActiveFile" |
  "defaultFileName"

interface CodeEditorCollabProps extends Omit<UseCodeEditorCollabProps, ReducedFields> {
  className?: string
  isReadOnly?: boolean
  withFileManager?: boolean
  socket: Socket
  isMultipleExtensionFiles?: boolean
  defaultFileName?: string
  onChangeCode?:(value: string)=>void
}

const CodeEditorCollab: FC<CodeEditorCollabProps> = ({
  className,
  isReadOnly: _isReadOnly = false,
  mode = EditorMode.Owner,
  withFileManager = true,
  roomId,
  socket,
  isMultipleExtensionFiles = false,
  defaultFileName = "index.html",
  onChangeCode = voidFunction,
  ...otherProps
}) => {
  const styles = useStyles();

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
    socket,
    roomId,
    mode,
  });

  const {
    editorRef,
    isLoading,
    extensions,
    doc,
    key,
    onCreateEditor,
    roomStatus
  } = useCodeEditorCollab({
    ...otherProps,
    ...collabProps,
    activeFile,
    mode,
    socket,
    roomId,
    defaultFileName,
  });

  const isReadOnly = _isReadOnly || (roomStatus === RoomStatus.Inactive);

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
            isMultipleExtensionFiles={isMultipleExtensionFiles}
          />

          <FileSwitcher
            activeFile={activeFile}
            onChange={onChangeFileWithEvents}
            fileList={addedFileList}
          />
        </>
      }

      <StatusLabel status={roomStatus} />

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
        onChange={(e) => onChangeCode(e)}
      />
    </div>
  )
}

export default memo(CodeEditorCollab);
