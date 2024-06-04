import { type FC, memo, useEffect, useMemo } from 'react'

import { Box, ClickAwayListener, Popover } from '@mui/material'
import CodeMirror from '@uiw/react-codemirror'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { Socket } from 'socket.io-client'

import { useAuthContext } from '@/auth/useAuthContext'
import { setPrevLessonCode, setPrevLessonId } from '@/redux/slices/code-panel-global'
import { useSelector } from '@/redux/store'
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
  onChangeCodemirrorValue?: (value: string) => void
}

const getLocalStorageRoomKey = (roomId: string | undefined): string => `room_doc_${roomId}`

const CodeEditorCollab: FC<CodeEditorCollabProps> = ({
  className,
  isReadOnly: _isReadOnly = false,
  mode = EditorMode.Owner,
  withFileManager = true,
  roomId,
  socket,
  isMultipleExtensionFiles = false,
  defaultFileName = 'index.html',
  preloadedCode,
  onChangeCodemirrorValue: onChangeCodemirrorValueFromProps = voidFunction,
  onChangeStreamingDocInfo: onChangeStreamingDocInfoFromProps,
  ...collabProps
}) => {
  const styles = useStyles()
  const lessonId = useSelector((state) => state.codePanelGlobal.lessonId)
  const prevLessonId = useSelector((state) => state.codePanelGlobal.prevLessonId)
  const prevLessonCode = useSelector((state) => state.codePanelGlobal.prevLessonCode)
  const { user, isInitialized: authIsInitialized } = useAuthContext()
  const { query } = useRouter()
  const dispatch = useDispatch()
  const localstorageCode = useMemo(() => {
    if (mode === EditorMode.Owner) {
      const localStorageCodeValue = localStorage.getItem(
        getLocalStorageRoomKey(user ? `${user?.student_profile?.id}_${lessonId}` : lessonId)
      )
      if (localStorageCodeValue) {
        try {
          const docInfo = JSON.parse(localStorageCodeValue) as Record<string, string>
          const code = prevLessonCode ?? (docInfo?.htmlBody as unknown as string[])?.join('')
          if (code) {
            return code
          }
        } catch (e) {
          return localStorageCodeValue;
        }
      }
    }
  }, [mode, query?.lessonId, prevLessonId, preloadedCode, user, lessonId])

  const onChangeCodemirrorValue = (value: string) => {
    onChangeCodemirrorValueFromProps(value)
    localStorage.setItem(getLocalStorageRoomKey(user ? `${user?.student_profile?.id}_${lessonId}` : lessonId), value);
    void updateCommentWidgetPosition()
  }

  const onChangeStreamingDocInfo = (doc: Record<string, string>) => {
    onChangeStreamingDocInfoFromProps?.(doc)

    onChangeCodemirrorValue(JSON.stringify(doc));

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
    ...collabPropsFromFileManager
  } = useFileManager({
    socket,
    roomId,
    mode,
  })

  const {
    editorRef,
    isLoading,
    extensions,
    streamingDoc,
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
    ...collabProps,
    ...collabPropsFromFileManager,
    onChangeStreamingDocInfo,
    preloadedCode: localstorageCode ?? preloadedCode,
    activeFile,
    mode,
    socket,
    roomId,
    defaultFileName,
  })

  const isReadOnly = _isReadOnly || roomStatus === RoomStatus.Inactive

  useEffect(() => {
    return () => {
      dispatch(setPrevLessonId(null))
      dispatch(setPrevLessonCode(null))
    }
  }, [])

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

      {(
        <>
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
            value={streamingDoc?.toString()?.length ? streamingDoc.toString() : localstorageCode ?? preloadedCode}
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

export default memo(CodeEditorCollab)
