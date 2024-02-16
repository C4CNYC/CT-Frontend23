import { type FC, memo } from 'react'

import CodeMirror from '@uiw/react-codemirror'
import type { Socket } from 'socket.io-client'

import { voidFunction } from '@/utils'

import { EditorMode } from '../constants'

import FileModal from './components/file-modal'
import FileSwitcher from './components/file-switcher'
import LoadingCodeEditor from './components/loading-code-editor'
import StatusLabel, { RoomStatus } from './components/status-label'
import { type UseCodeEditorCollabProps, useCodeEditorCollab } from './hook'
import { useFileManager } from './hook/file-manager'
import { useStyles } from './styles'

type ReducedFields =
  | 'activeFile'
  | 'onDeleteFile'
  | 'setActiveFile'
  | 'onResetFileManager'
  | 'socket'
  | 'setLocalActiveFile'
  | 'defaultFileName'

interface CodeEditorCollabProps extends Omit<UseCodeEditorCollabProps, ReducedFields> {
  className?: string
  isReadOnly?: boolean
  withFileManager?: boolean
  socket?: Socket
  isMultipleExtensionFiles?: boolean
  defaultFileName?: string
  onChangeCode?: (value: string) => void
}

const CodeEditorCollab: FC<CodeEditorCollabProps> = ({
  className,
  isReadOnly: _isReadOnly = false,
  mode = EditorMode.Owner,
  withFileManager = true,
  roomId,
  socket,
  isMultipleExtensionFiles = false,
  defaultFileName = 'index.html',
  onChangeCode = voidFunction,
  ...otherProps
}) => {
  const styles = useStyles()

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
  })

  const { editorRef, isLoading, extensions, doc, key, onCreateEditor, roomStatus } =
    useCodeEditorCollab({
      ...otherProps,
      ...collabProps,
      activeFile,
      mode,
      socket,
      roomId,
      defaultFileName,
    })

  const isReadOnly = _isReadOnly || roomStatus === RoomStatus.Inactive

  console.log({doc, extensions})

  return (
    <div
      className={`${styles.wrapper} code-editor-wrapper`}
      ref={editorRef}
    >
      {withFileManager && (
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
      )}

      <StatusLabel status={roomStatus} />

      {isLoading && <LoadingCodeEditor />}
      {/* <CodeMirror
        onCreateEditor={onCreateEditor}
        key={key}
        className={className}
        height='100%'
        basicSetup={false}
        theme='dark'
        extensions={extensions}
        readOnly={isReadOnly}
        value={doc}
        onChange={onChangeCode}
      /> */}
    </div>
  )
}

export default memo(CodeEditorCollab)
