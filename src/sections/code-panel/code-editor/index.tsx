import { type FC, memo, useMemo } from 'react'

import { Box, ClickAwayListener, Popover } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import CodeMirror from '@uiw/react-codemirror'
import { Socket } from 'socket.io-client'

import { CodeDocument } from '@/types/code-document'
import { voidFunction } from '@/utils/voidFunction'

import AddComment from './add-comment'
import CommentPopup from './comment-popup'
import FileModal from './file-modal'
import FileSwitcher from './file-switcher'
import { EditorMode } from './lib/hooks/constants'
import { useFileManager } from './lib/hooks/file-manager'
import { type UseCodeEditorProps, useCodeCollab } from './lib/hooks/useCodeCollab'
import LoadingCodeEditor from './loading-code-editor'
import StatusLabel, { RoomStatus } from './status-label'

type ReducedFields =
  | 'activeFile'
  | 'onDeleteFile'
  | 'setActiveFile'
  | 'onResetFileManager'
  | 'socket'
  | 'setLocalActiveFile'
  | 'defaultFileName'

interface CodeEditorProps extends Omit<UseCodeEditorProps, ReducedFields> {
  className?: string
  isReadOnly?: boolean
  withFileManager?: boolean
  socket?: Socket
  isMultipleExtensionFiles?: boolean
  defaultFileName?: string
  onChangeCodemirrorValue?: (value: string) => void
}

const getLocalStorageRoomKey = (roomId: string) => `room_doc_${roomId}`

const useStyles = makeStyles({
  wrapper: {
    position: 'relative',
    background: '#282c34',
    minHeight: '100%',

    '& .cm-line': {
      position: 'relative',
    },
  },
  popover: {
    position: 'static',
    '& .MuiPaper-root': {
      background: '#282c34',
      borderRadius: '8px',
    },
  },
})

const CodeEditor: FC<CodeEditorProps> = ({
  className,
  isReadOnly: isReadOnlyFromProps = false,
  mode = EditorMode.Owner,
  withFileManager = true,
  roomId,
  socket,
  isMultipleExtensionFiles = false,
  defaultFileName = 'index.html',
  preloadedCode,
  onChangeCodemirrorValue: onChangeCodemirrorValueFromProps = voidFunction,
  onChangeStreamingDocInfo: onChangeStreamingDocInfoFromProps,

  code,
  user,
  onRoomStatusChanged,
  isLoading: isLoadingProp,
  withTooltip,
  cursorText,

  // ...codeEditorProps
}) => {
  const styles = useStyles()

  const localStorageCode = useMemo(() => {
    if (mode === EditorMode.Owner) {
      const json = localStorage.getItem(getLocalStorageRoomKey(roomId))
      if (json) {
        try {
          const docInfo = JSON.parse(json) as Record<string, string>
          const code = (docInfo?.htmlBody as unknown as string[])?.join('')
          if (code) {
            return code
          }
        } catch (e) {}
      }
    }
  }, [mode, roomId])

  const onChangeCodemirrorValue = (value: string) => {
    onChangeCodemirrorValueFromProps(value)
    void updateCommentWidgetPosition()
  }
  const onChangeStreamingDocInfo = (doc: CodeDocument) => {
    onChangeStreamingDocInfoFromProps?.(doc)

    localStorage.setItem(getLocalStorageRoomKey(roomId), JSON.stringify(doc))
  }

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

    onResetFileManager,
    setActiveFile,
    onDeleteFile,
  } = useFileManager({
    socket,
    roomId,
    mode,
  })

  const {
    editorRef,
    codeMirror: {
      isInitializing: codeMirrorIsInitializing,
      extensions: codeMirrorExtensions,
      streamingDoc,
      key: codeMirrorKey,
    },
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
  } = useCodeCollab({
    // ...codeEditorProps,

    code,
    user,
    onRoomStatusChanged,
    isLoading: isLoadingProp,
    withTooltip,
    cursorText,

    onResetFileManager,
    setActiveFile,
    // onDeleteFile,

    onChangeStreamingDocInfo,
    preloadedCode: localStorageCode ?? preloadedCode,
    activeFile,
    mode,
    socket,
    roomId,
    defaultFileName,
  })

  const isReadOnly = isReadOnlyFromProps || roomStatus === RoomStatus.Inactive

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

      {codeMirrorIsInitializing || isLoadingProp || !streamingDoc ? (
        <LoadingCodeEditor />
      ) : (
        <>
          <CodeMirror
            onContextMenu={onContextMenu}
            onCreateEditor={onCreateEditor}
            key={codeMirrorKey}
            className={className}
            height='100%'
            basicSetup={false}
            theme='dark'
            extensions={codeMirrorExtensions}
            readOnly={isReadOnly}
            value={streamingDoc.toString()}
            onChange={onChangeCodemirrorValue}
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
        </>
      )}
    </div>
  )
}

export default memo(CodeEditor)
