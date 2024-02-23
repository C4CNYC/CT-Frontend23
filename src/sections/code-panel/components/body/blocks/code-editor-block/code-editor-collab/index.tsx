import { type FC, memo } from 'react'

import { Box, ClickAwayListener, Popover } from '@mui/material'
import CodeMirror from '@uiw/react-codemirror'
import { Socket } from 'socket.io-client'

import { voidFunction } from '@/utils'

import AddComment from './components/add-comment'
import CommentPopup from './components/comment-popup'
import FileModal from './components/file-modal'
import FileSwitcher from './components/file-switcher'
import LoadingCodeEditor from './components/loading-code-editor'
import StatusLabel, { RoomStatus } from './components/status-label'
import { type UseCodeEditorCollabProps, useCodeEditorCollab } from './hook'
import { EditorMode } from './hook/constants'
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
  onChangeCode: _onChangeCode = voidFunction,
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

  const {
    editorRef,
    isLoading,
    extensions,
    doc,
    key,
    onCreateEditor,
    roomStatus,
    commentProps: {
      onContextMenu,
      isAddCommentDisabled,
      isAddCommentOpen,
      position,
      setIsAddCommentOpen,
      onAddComment,
      isCommentPopupOpen,
      commentPopupProps,
      onCloseCommentPopup,
      onRemoveComment,
      onRemoveCommentGroup,
      updateCommentWidgetPosition,
    },
  } = useCodeEditorCollab({
    ...otherProps,
    ...collabProps,
    activeFile,
    mode,
    socket,
    roomId,
    defaultFileName,
  })

  const isReadOnly = _isReadOnly || roomStatus === RoomStatus.Inactive
  const onChangeCode = (value: string) => {
    _onChangeCode(value)
    void updateCommentWidgetPosition()
  }

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

      {isLoading || (otherProps.isFetching && <LoadingCodeEditor />)}

      <CodeMirror
        onContextMenu={onContextMenu}
        onCreateEditor={onCreateEditor}
        key={key}
        className={className}
        height='100%'
        basicSetup={false}
        theme='dark'
        extensions={extensions}
        readOnly={isReadOnly}
        value={doc}
        onChange={otherProps.onChange as any}
      />

      <CommentPopup
        {...commentPopupProps}
        isOpen={isCommentPopupOpen}
        onClose={onCloseCommentPopup}
        onRemoveComment={onRemoveComment}
        onRemoveCommentGroup={onRemoveCommentGroup}
        activeFile={activeFile}
      />

      <Popover
        classes={{ root: styles.popover }}
        anchorReference='anchorPosition'
        open={isAddCommentOpen}
        anchorPosition={position}
      >
        <ClickAwayListener onClickAway={() => setIsAddCommentOpen(false)}>
          <Box>
            <AddComment
              isDisabled={isAddCommentDisabled}
              onAddComment={onAddComment}
              onClose={() => setIsAddCommentOpen(false)}
            />
          </Box>
        </ClickAwayListener>
      </Popover>
    </div>
  )
}

export default memo(CodeEditorCollab)
