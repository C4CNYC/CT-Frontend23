import { type FC, memo, useEffect } from 'react'

import CodeMirror from '@uiw/react-codemirror'
import { useDispatch } from 'react-redux'
import { Socket } from 'socket.io-client'

import { setPrevLessonCode, setPrevLessonId } from '@/redux/slices/code-panel-global'
import { voidFunction } from '@/utils'

import CommentPopup from './components/comment-popup'
import { ColabContextMenu } from './components/context-menu'
import LoadingCodeEditor from './components/loading-code-editor'
import NoActiveFile from './components/no-active-file'
import { type UseCodeEditorCollabProps, useCodeEditorCollab } from './hook'
import { EditorMode } from './hook/constants'
import { type File } from './hook/requests'
import { CodeEditorBlockWrapper } from './styles'

type ReducedFields =
  | 'activeFile'
  | 'onDeleteFile'
  | 'setActiveFile'
  | 'onResetFileManager'
  | 'socket'
  | 'setLocalActiveFile'
  | 'defaultFileName'

interface CodeEditorCollabProps extends Omit<UseCodeEditorCollabProps, ReducedFields> {
  activeFile?: File
  className?: string
  isReadOnly?: boolean
  withFileManager?: boolean
  socket?: Socket
  isMultipleExtensionFiles?: boolean
  defaultFileName?: string
  onChangeCodemirrorValue?: (value: string) => void
}

const ACCEPTABLE_DOC_WAITING_TIME = 2000

const CodeEditorCollab: FC<CodeEditorCollabProps> = ({
  className,
  activeFile,
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
  const dispatch = useDispatch()

  const onChangeCodemirrorValue = (value: string) => {
    onChangeStreamingDocInfoFromProps?.(value)
    onChangeCodemirrorValueFromProps(value)
    void updateCommentWidgetPosition()
  }

  const {
    editorRef,
    isLoading,
    extensions,
    streamingDoc,
    key,
    onCreateEditor,
    commentProps: {
      onContextMenu,
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
    preloadedCode,
    activeFile,
    mode,
    socket,
    roomId,
    defaultFileName,
  })

  const isReadOnly = _isReadOnly

  useEffect(() => {
    return () => {
      dispatch(setPrevLessonId(null))
      dispatch(setPrevLessonCode(null))
    }
  }, [])

  if (!activeFile) return <NoActiveFile />

  return (
    <CodeEditorBlockWrapper
      className='code-editor-wrappe'
      ref={editorRef}
    >
      {isLoading || collabProps.isFetching || !streamingDoc ? (
        <LoadingCodeEditor />
      ) : (
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
            value={streamingDoc.toString() ?? preloadedCode}
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

          <ColabContextMenu
            onAddComment={onAddComment}
            isAddCommentOpen={isAddCommentOpen}
            setIsAddCommentOpen={setIsAddCommentOpen}
            position={position}
          />
        </>
      )}
    </CodeEditorBlockWrapper>
  )
}

export default memo(CodeEditorCollab)
